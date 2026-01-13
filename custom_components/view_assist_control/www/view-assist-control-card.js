
const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace") || customElements.get("hc-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class ViewAssistControlCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  static getStubConfig() {
    return { device_id: "" };
  }

  setConfig(config) {
    if (!config.device_id) {
      throw new Error("Please select a View Assist Satellite");
    }
    this.config = config;
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <ha-card header="View Assist Control">
        <div class="card-content">
          <div class="row">
            <mwc-button @click=${this._set5MinTimer} raised>
              <ha-icon icon="mdi:timer-outline"></ha-icon>
              5 Min Timer
            </mwc-button>
             <mwc-button @click=${this._set15MinTimer} raised>
              <ha-icon icon="mdi:timer-outline"></ha-icon>
              15 Min Timer
            </mwc-button>
          </div>
          <div class="info">
            Targeting: ${this.config.device_name || this.config.device_id}
          </div>
          <!-- In the future, we can dynamically list active entities here too -->
        </div>
      </ha-card>
    `;
  }

  _set5MinTimer() {
    this.hass.callService("view_assist", "set_timer", {
      time: "5 minutes",
      device_id: this.config.device_id,
    });
  }
  
  _set15MinTimer() {
    this.hass.callService("view_assist", "set_timer", {
      time: "15 minutes",
      device_id: this.config.device_id,
    });
  }

  static get styles() {
    return css`
      .card-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .row {
        display: flex;
        justify-content: space-around;
      }
      .info {
        font-size: 0.8em;
        color: var(--secondary-text-color);
        text-align: center;
      }
      mwc-button {
        --mdc-theme-primary: var(--primary-color);
      }
      ha-icon {
        margin-right: 8px;
      }
    `;
  }

  static getConfigElement() {
    return document.createElement("view-assist-control-card-editor");
  }
}

class ViewAssistControlCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _devices: { state: true },
    };
  }

  setConfig(config) {
    this.config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDevices();
  }

  async _loadDevices() {
    if (!this.hass) return;
    const devices = await this.hass.callWS({ type: "config/device_registry/list" });
    
    // Filter for View Assist devices
    this._devices = devices
      .filter((d) => {
        const manuf = (d.manufacturer || "").toLowerCase();
        const model = (d.model || "").toLowerCase();
        const name = (d.name || "").toLowerCase();
        return manuf.includes("view assist") || model.includes("view assist") || name.includes("view assist");
      })
      .map((d) => ({
        id: d.id,
        name: d.name_by_user || d.name || "Unknown Satellite",
      }));
      
    // If no specific devices found, show all (fallback) or handle empty
    if (this._devices.length === 0) {
        // Fallback: Show all devices, or maybe let user type ID 
        // For now, let's just dump everything if filter fails so they can find it manually
        // Or keep it empty and show a message.
    }
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) return;
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) return;
    
    // Find device name if we selected a device
    let update = { ...this.config };
    update[target.configValue] = target.value;
    
    if (target.configValue === 'device_id') {
        const dev = this._devices.find(d => d.id === target.value);
        if (dev) update.device_name = dev.name;
    }

    this.config = update;
    const event = new CustomEvent("config-changed", {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const deviceId = this.config.device_id || "";

    return html`
      <div class="card-config">
        <label id="device-label">Select Satellite</label>
        <select
          .value=${deviceId}
          .configValue=${"device_id"}
          @change=${this._valueChanged}
          style="width: 100%; padding: 8px;"
        >
          <option value="" disabled ?selected=${deviceId === ""}>Select a device...</option>
          ${(this._devices || []).map(
            (dev) => html`<option value=${dev.id} ?selected=${deviceId === dev.id}>${dev.name}</option>`
          )}
        </select>
        
        ${(this._devices || []).length === 0 ? html`<p class="warning">No "View Assist" devices found. Make sure they are registered.</p>` : ''}
      </div>
    `;
  }
  
  static get styles() {
      return css`
        .card-config { padding: 16px; }
        label { display: block; margin-bottom: 8px; font-weight: bold; }
        .warning { color: var(--error-color); font-size: 0.9em; }
      `
  }
}

customElements.define("view-assist-control-card", ViewAssistControlCard);
customElements.define("view-assist-control-card-editor", ViewAssistControlCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "view-assist-control-card",
  name: "View Assist Control",
  preview: true,
  description: "Control timers for View Assist Satellites",
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';

@customElement('view-assist-control-card')
export class ViewAssistControlCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: any;

  public setConfig(config: any): void {
    if (!config.device_id) {
      // throw new Error("Please select a View Assist Satellite");
    }
    this.config = config;
  }

  protected render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    const deviceName = this.config.device_name || this.config.device_id || "Unconfigured";

    return html`
      <ha-card header="View Assist Control">
        <div class="card-content">
          <div class="row">
            <mwc-button @click=${this._set5MinTimer} raised>
              <ha-icon icon="mdi:timer-outline"></ha-icon>
              5 Min
            </mwc-button>
             <mwc-button @click=${this._set15MinTimer} raised>
              <ha-icon icon="mdi:timer-outline"></ha-icon>
              15 Min
            </mwc-button>
          </div>
          <div class="info">
            Targeting: ${deviceName}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _set5MinTimer() {
    this.hass.callService("view_assist", "set_timer", {
      time: "5 minutes",
      device_id: this.config.device_id,
    });
  }
  
  private _set15MinTimer() {
    this.hass.callService("view_assist", "set_timer", {
      time: "15 minutes",
      device_id: this.config.device_id,
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
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
        background-color: var(--primary-color); 
        color: white;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
      }
      ha-icon {
        margin-right: 8px;
        --mdc-icon-size: 20px;
      }
    `;
  }

  public static getConfigElement() {
    return document.createElement("view-assist-control-card-editor");
  }

  public static getStubConfig() {
    return { device_id: "" };
  }
}

@customElement('view-assist-control-card-editor')
export class ViewAssistControlCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: any;
  @state() private _devices: any[] = [];

  public setConfig(config: any): void {
    this.config = config;
  }

  protected firstUpdated(): void {
    this._loadDevices();
  }

  private async _loadDevices() {
    if (!this.hass) return;
    try {
        const devices = await this.hass.callWS<any[]>({ type: "config/device_registry/list" });
        
        // Filter for actual View Assist Satellite devices only
        // Exclude integration entries
        this._devices = devices
        .filter((d: any) => {
            const model = (d.model || "").toLowerCase();
            const name = (d.name || "").toLowerCase();
            const manufacturer = (d.manufacturer || "").toLowerCase();
            
            // Skip integration entries
            if (model.includes("(integration)") || name.includes("(integration)")) {
                return false;
            }
            if (name.includes("companion app")) {
                return false;
            }
            
            // Look for actual satellite devices
            if (model.includes("satellite") || name.includes("satellite")) {
                return true;
            }
            if (manufacturer === "view assist" && !model.includes("integration")) {
                return true;
            }
            
            return false;
        })
        .map((d: any) => ({
            id: d.id,
            name: d.name_by_user || d.name || "Unknown Satellite",
        }));
    } catch (e) {
        console.error("Error loading devices", e);
    }
  }

  private _valueChanged(ev: any) {
    if (!this.config || !this.hass) return;
    const target = ev.target;
    if (this.config[target.configValue] === target.value) return;
    
    // Find device name if we selected a device
    const update = { ...this.config };
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

  protected render() {
    if (!this.hass || !this.config) return html``;

    const deviceId = this.config.device_id || "";

    return html`
      <div class="card-config">
        <label id="device-label">Select Satellite</label>
        <select
          .value=${deviceId}
          .configValue=${"device_id"}
          @change=${this._valueChanged}
          style="width: 100%; padding: 8px; border-radius: 4px;"
        >
          <option value="" disabled ?selected=${deviceId === ""}>Select a device...</option>
          ${this._devices.map(
            (dev) => html`<option value=${dev.id} ?selected=${deviceId === dev.id}>${dev.name}</option>`
          )}
        </select>
        
        ${this._devices.length === 0 ? html`<p class="warning">No "View Assist" devices found.</p>` : ''}
      </div>
    `;
  }
  
  static get styles(): CSSResultGroup {
      return css`
        .card-config { padding: 16px; }
        label { display: block; margin-bottom: 8px; font-weight: bold; }
        .warning { color: var(--error-color); font-size: 0.9em; }
        select { border: 1px solid var(--divider-color); }
      `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "view-assist-control-card",
  name: "View Assist Control",
  preview: true,
  description: "Control timers for View Assist Satellites",
});

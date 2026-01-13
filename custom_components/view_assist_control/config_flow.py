"""Config flow for View Assist Control integration."""
import logging
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import device_registry as dr

from . import DOMAIN

_LOGGER = logging.getLogger(__name__)

class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for View Assist Control."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        errors = {}

        if user_input is not None:
            return self.async_create_entry(
                title=f"View Assist ({user_input['device_name']})", 
                data={
                    "device_id": user_input["device_id"],
                    "device_name": user_input["device_name"]
                }
            )

        # Discovery logic: Find View Assist Satellite devices
        device_registry = dr.async_get(self.hass)
        satellites = {}
        
        for device in device_registry.devices.values():
            # Check for specific View Assist markings
            # This logic depends on how View Assist registers devices. 
            # Often they have a specific manufacturer or model.
            # We'll check widely for 'View Assist' strings.
            is_satellite = False
            if device.manufacturer and "View Assist" in device.manufacturer:
                is_satellite = True
            elif device.model and "View Assist" in device.model:
                is_satellite = True
            elif device.name and "View Assist" in device.name:
                # Fallback to name if manufacturer isn't set
                is_satellite = True
            
            if is_satellite:
                satellites[device.id] = f"{device.name} ({device.model})"

        if not satellites:
            # Fallback if no devices found (or for manual testing)
            # We can allow manual entry of an ID or show an error
            # For this impl, we'll allow manual string entry if no devices found
            # But normally we'd show a form to Pick from list.
            schema = vol.Schema({
                vol.Required("device_id", description="Device ID (Manual Entry)"): str,
                vol.Required("device_name", default="Manual Satellite"): str,
            })
        else:
            # Create a selection list
            # We need to map the selection back to the ID
            # In HA config flow, usually we use vol.In
            satellite_options = {k: v for k, v in satellites.items()}
            
            schema = vol.Schema({
                vol.Required("device_id"): vol.In(satellite_options),
                # We can't easily get the name in the data output from vol.In, 
                # so we might iterate again or just store the ID. 
                # Ideally we want the name for the title.
                # Let's ask for a name or infer it.
                vol.Optional("device_name", default="View Assist Satellite"): str
            })

        return self.async_show_form(
            step_id="user",
            data_schema=schema,
            errors=errors,
            description_placeholders={"device_count": str(len(satellites))},
        )

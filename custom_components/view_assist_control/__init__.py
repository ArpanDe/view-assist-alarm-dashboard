"""
Custom Component to expose View Assist timers as entities.
"""
import logging
import asyncio
from datetime import timedelta
from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.helpers import discovery

_LOGGER = logging.getLogger(__name__)

DOMAIN = "view_assist_control"
PLATFORMS = ["sensor", "switch"]

async def async_setup(hass: HomeAssistant, config: dict):
    """Set up the View Assist Control component."""
    hass.data.setdefault(DOMAIN, {})
    
    # Register static path for the custom card
    path = hass.config.path(f"custom_components/{DOMAIN}/www/view-assist-control-card.js")
    hass.http.register_static_path(
        "/view_assist_control/view-assist-control-card.js",
        path,
        cache_headers=False # helpful for dev
    )
    
    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Set up View Assist Control from a config entry."""
    _LOGGER.info(f"Setting up View Assist Control for entry: {entry.entry_id}")

    # Get selected device from config
    device_id = entry.data.get("device_id")

    async def async_update_data():
        """Fetch data from View Assist."""
        # Here we would call view_assist.get_timers for the specific device_id
        # For now, we return empty data or simulate
        _LOGGER.debug(f"Pulling timer data for device {device_id}")
        return {}

    coordinator = DataUpdateCoordinator(
        hass,
        _LOGGER,
        name="view_assist_coordinator",
        update_method=async_update_data,
        update_interval=timedelta(seconds=30),
    )

    await coordinator.async_config_entry_first_refresh()
    
    hass.data[DOMAIN][entry.entry_id] = {
        "coordinator": coordinator,
        "device_id": device_id
    }

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id)

    return unload_ok

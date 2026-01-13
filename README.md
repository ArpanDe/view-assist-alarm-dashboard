# View Assist Control

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A Home Assistant Custom Component to expose [View Assist](https://github.com/dinki/View-Assist) timers and alarms as standard entities. This allows you to visualize and control your voice assistant timers directly from any Lovelace dashboard.

## Features

*   **Zero Configuration**: Automatically discovers your View Assist Satellites.
*   **Standard Entities**: Creates `sensor` (status) and `switch` (control) entities for up to 5 concurrent timers per device.
*   **UI Config Flow**: Setup everything through the Home Assistant Integrations page.
*   **Device Targeting**: control specific satellites without messy automation lookups.

## Installation

### Option 1: HACS (Recommended)
1.  Open HACS.
2.  Go to "Integrations" > upper right menu > "Custom repositories".
3.  Add the URL of this repository.
4.  Search for "View Assist Control" and install.
5.  Restart Home Assistant.

### Option 2: Manual
1.  Download the `custom_components/view_assist_control` folder.
2.  Copy it to your Home Assistant's `config/custom_components/` directory.
3.  Restart Home Assistant.

## Configuration

1.  Go to **Settings** > **Devices & Services**.
2.  Click **Add Integration**.
3.  Search for **View Assist Control**.
4.  Select your View Assist Satellite from the list.

## Lovelace Card
This repository also includes a custom Lovelace card with a **Visual Editor**.

### Installation
1.  Ensure `dist/view-assist-control-card.js` is accessible in your `www` folder or installed via HACS (if configured).
2.  Go to **Configuration** > **Dashboards** > **Resources**.
3.  Add Resource:
    *   URL: `/hacsfiles/view-assist-control/view-assist-control-card.js` (if via HACS)
    *   *Or* `/local/view-assist-control-card.js` (if manual).
    *   Type: JavaScript Module.

### Usage
1.  Go to your Dashboard, click **Edit**.
2.  Click **Add Card**.
3.  Search for **View Assist Control**.
4.  **Dropdown**: Use the dropdown menu to select your satellite! No Manual ID entry required.

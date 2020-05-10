class Browser {
  constructor () {
    // Linux ident
    this.linuxString = 'Linux'
    // MacOS ident
    this.macosString = 'MacOS'
    // Unknown OS ident
    this.unknownOSString = 'Unknown OS'
    // Windows OS ident
    this.windowsString = 'Windows'
    // Unix OS ident
    this.unixString = 'UNIX'
    // Initialize AppVersion (String with browser and system info)
    this.appVersion = navigator.appVersion
    // Initialize browser's OS
    this.OSString = this.os() || this.unknownOSString
  }

  /**
   * Get browser and system make & version
   * @return {String} String with browser and system details
   */
  browserInfo = () => this.appVersion || navigator.appVersion

  /**
   * Checks if browser is running on Linux OS
   * @return {Bool} True if system is Linux, false otherwise
   */
  isLinux = () => this.os() === this.linuxString

  /**
   * Checks if browser is running on MacOS
   * @return {Bool} True if system is MacOS, false otherwise
   */
  isMac = () => this.os() === this.macosString

  /**
   * Checks if browser is running on UNIX
   * @return {Bool} True if system is UNIX, false otherwise
   */
  isUnix = () => this.os() === this.windowsString

  /**
   * Checks if browser is running on Windows
   * @return {Bool} True if system is Windows, false otherwise
   */
  isWin = () => this.os() === this.unixString

  /**
   * Returns OS on which browser is running on
   * @return {String} Current OS Name
   */
  os () {
    this.OSString = this.unknownOSString
    if (this.browserInfo().indexOf('Win') !== -1) {
      this.OSString = this.windows
    }
    if (this.browserInfo().indexOf('Mac') !== -1) {
      this.OSString = this.macos
    }
    if (this.browserInfo().indexOf('X11') !== -1) {
      this.OSString = this.unix
    }
    if (this.browserInfo().indexOf('Linux') !== -1) {
      this.OSString = this.linux
    }
    return this.OSString
  }
}
export const browser = new Browser()

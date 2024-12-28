
function getDeviceFingerprint() {
    const fingerprint = {
        browser: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        // screenResolution: `${screen.width}x${screen.height}`,
        // colorDepth: screen.colorDepth,
        deviceMemory: navigator.deviceMemory || 'Unknown',
        hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        connection: navigator.connection ? navigator.connection.effectiveType : 'Unknown',
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
    };

    // Canvas fingerprinting (optional, advanced technique)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 100, 50);
    ctx.fillStyle = 'white';
    ctx.fillText('Hello, world!', 2, 2);
    fingerprint.canvasHash = canvas.toDataURL();

    return fingerprint;
}
export default getDeviceFingerprint;
console.log(getDeviceFingerprint());

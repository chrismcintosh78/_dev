class ColorSchemeGenerator {
    constructor(baseColor) {
        this.baseColor = baseColor;
        this.schemes = {
            complementary: this.getComplementary(),
            monochromatic: this.getMonochromatic(),
            analogous: this.getAnalogous(),
            triadic: this.getTriadic(),
            tetradic: this.getTetradic(),
        };
    }

    // Helper function to convert hex to HSL
    hexToHSL(hex) {
        hex = hex.replace("#", "");
        let r = parseInt(hex.substring(0, 2), 16) / 255;
        let g = parseInt(hex.substring(2, 4), 16) / 255;
        let b = parseInt(hex.substring(4, 6), 16) / 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        return { h, s, l };
    }

    // Helper function to convert HSL to hex
    hslToHex(h, s, l) {
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }

        r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
        g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
        b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

        return `#${r}${g}${b}`;
    }

    // Complementary color scheme
    getComplementary() {
        let hsl = this.hexToHSL(this.baseColor);
        let complementaryHue = (hsl.h + 180) % 360;
        let complementaryColor = this.hslToHex(complementaryHue, hsl.s, hsl.l);
        return [this.baseColor, complementaryColor];
    }

    // Monochromatic color scheme
    getMonochromatic() {
        const adjustBrightness = (hex, amount) => {
            let r = parseInt(hex.slice(1, 3), 16);
            let g = parseInt(hex.slice(3, 5), 16);
            let b = parseInt(hex.slice(5, 7), 16);

            r = Math.min(255, Math.max(0, r + amount));
            g = Math.min(255, Math.max(0, g + amount));
            b = Math.min(255, Math.max(0, b + amount));

            return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        };

        let lighterShade = adjustBrightness(this.baseColor, 40);
        let darkerShade = adjustBrightness(this.baseColor, -40);

        return [lighterShade, this.baseColor, darkerShade];
    }

    // Analogous color scheme
    getAnalogous() {
        let hsl = this.hexToHSL(this.baseColor);
        let hueLeft = (hsl.h - 30 + 360) % 360;
        let hueRight = (hsl.h + 30) % 360;

        let leftAnalogous = this.hslToHex(hueLeft, hsl.s, hsl.l);
        let rightAnalogous = this.hslToHex(hueRight, hsl.s, hsl.l);

        return [leftAnalogous, this.baseColor, rightAnalogous];
    }

    // Triadic color scheme
    getTriadic() {
        let hsl = this.hexToHSL(this.baseColor);
        let hueLeft = (hsl.h - 120 + 360) % 360;
        let hueRight = (hsl.h + 120) % 360;

        let triadicLeft = this.hslToHex(hueLeft, hsl.s, hsl.l);
        let triadicRight = this.hslToHex(hueRight, hsl.s, hsl.l);

        return [triadicLeft, this.baseColor, triadicRight];
    }

    // Tetradic color scheme
    getTetradic() {
        let hsl = this.hexToHSL(this.baseColor);
        let complementaryHue = (hsl.h + 180) % 360;
        let tetradicHue1 = (hsl.h + 90) % 360;
        let tetradicHue2 = (complementaryHue + 90) % 360;

        let complementaryColor = this.hslToHex(complementaryHue, hsl.s, hsl.l);
        let tetradicColor1 = this.hslToHex(tetradicHue1, hsl.s, hsl.l);
        let tetradicColor2 = this.hslToHex(tetradicHue2, hsl.s, hsl.l);

        return [this.baseColor, complementaryColor, tetradicColor1, tetradicColor2];
    }
}

// Example usage:
let colorScheme = new ColorSchemeGenerator("#3498db"); // Base color
console.log(colorScheme.schemes);

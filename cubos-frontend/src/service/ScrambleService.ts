import { Canvas as CanvasPG, CanvasVisualizerOptions, CubeOptions, Type } from "sr-puzzlegen";
import { RED, GREEN, WHITE, YELLOW, BLUE } from "sr-puzzlegen/dist/lib/puzzles/colors";


function GenerateScrambleImageTexture(opts: CanvasVisualizerOptions) {
    if (document == null) return null;

    const div_wrapper = document.createElement("div");
    CanvasPG(div_wrapper, Type.CUBE_NET, opts);

    const canvasEl = div_wrapper.querySelector("canvas");
    return canvasEl?.toDataURL('image/png', 1.0);
}


export class ScrambleService {
    scramble_module = null;

    constructor() {
    }

    async Load() {
        this.scramble_module = await import(/* webpackIgnore: true */ "https://cdn.cubing.net/v0/js/cubing/scramble");
    }

    isLoaded() {
        return this.scramble_module === null;
    }

    async Generate(type: string) {
        if (!this.scramble_module) return null;

        const scramble = await this.scramble_module.randomScrambleForEvent(type) + "";
        return scramble;
    }

    static generatePNGFromScramble(scramble: string) {
        const puzzleOpts: CubeOptions = {
            scheme: {
                L: RED,
                R: { value: "#F76806" },
                D: WHITE,
                U: YELLOW,
                F: GREEN,
                B: BLUE 
            },
            alg: scramble ?? "",
            size: 3
        };

        const canvasOpts: CanvasVisualizerOptions = {
            width: 1024,
            height: 1024,
            lineWidth: 1,
            puzzle: puzzleOpts
        };
    
        return GenerateScrambleImageTexture(canvasOpts);
    }
}
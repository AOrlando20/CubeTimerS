export class ScrambleService {
    static scramble_module = undefined;
    constructor() {}
    
    static async Initialize() {
        ScrambleService.scramble_module = await import(/* webpackIgnore: true */ "https://cdn.cubing.net/v0/js/cubing/scramble")
    }

    static async Generate(type: string) {
        if (!ScrambleService.scramble_module) return null;

        const scramble = await ScrambleService.scramble_module.randomScrambleForEvent(type) + "";
        return scramble;
    }

    static isLoaded() {
        return ScrambleService.scramble_module === undefined;
    }
}
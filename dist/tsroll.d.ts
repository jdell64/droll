export declare module DiceRoller {
    class DrollFormula {
        numDice: number;
        numSides: number;
        modifier: number;
        constructor(numDice: number, numSides: number, modifier: number);
    }
    class DrollResult {
        rolls: number[];
        modifier: number;
        total: number;
        constructor(rolls: number[], modifier?: number, total?: number);
        toString: () => string;
    }
    class Droll {
        parse: (formula: String) => DrollFormula;
        roll: (formula: String) => DrollResult;
        validate: (formula: String) => boolean;
    }
}

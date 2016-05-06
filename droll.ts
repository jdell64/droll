export module DiceRoller {

  // Define a "class" to represent a formula
  export class DrollFormula {
    constructor(public numDice: number, public numSides: number,
                public modifier: number){};
  }

  // Define a "class" to represent the results of the roll
  export class DrollResult {
    constructor(public rolls = [], public modifier = 0, public total = 0){};

    toString = function() {
      if (this.rolls.length === 1 && this.modifier === 0) {
        return this.rolls[0] + '';
      }
      if (this.rolls.length > 1 && this.modifier === 0) {
        return this.rolls.join(' + ') + ' = ' + this.total;
      }
      if (this.rolls.length === 1 && this.modifier > 0) {
        return this.rolls[0] + ' + ' + this.modifier + ' = ' + this.total;
      }
      if (this.rolls.length > 1 && this.modifier > 0) {
        return this.rolls.join(' + ') + ' + ' + this.modifier + ' = ' +
               this.total;
      }
      if (this.rolls.length === 1 && this.modifier < 0) {
        return this.rolls[0] + ' - ' + Math.abs(this.modifier) + ' = ' +
               this.total;
      }
      if (this.rolls.length > 1 && this.modifier < 0) {
        return this.rolls.join(' + ') + ' - ' + Math.abs(this.modifier) +
               ' = ' + this.total;
      }
    }
  }

  export class Droll {
    parse = function(formula) {
      var pieces: any;
      var result = new DrollFormula(0, 0, 0);
      pieces = formula.match(/^([1-9]\d*)?d([1-9]\d*)([+-]\d+)?$/i);

      if (!pieces) {
        return null;
      }

      result.numDice = (pieces[1] - 0) || 1;
      result.numSides = (pieces[2] - 0);
      result.modifier = (pieces[3] - 0) || 0;

      return result;
    };

    roll = function(formula) {
      var pieces = null;
      var result = new DrollResult();

      var pieces = this.parse(formula);
      if (!pieces) {
        return null;
      }

      for (var a = 0; a < pieces.numDice; a++) {
        result.rolls[a] = (1 + Math.floor(Math.random() * pieces.numSides));
      }

      result.modifier = pieces.modifier;

      for (var b = 0; b < result.rolls.length; b++) {
        result.total += result.rolls[b];
      }
      result.total += result.modifier;

      return result;
    };

    /**
     * Test the validity of the formula.
     * Returns true on success or false on failure.
     */
    validate = function(formula) {
      return (this.parse(formula)) ? true : false;
    };

    /**
     * Roll the dice defined by the formula.
     * Returns a DrollResult object on success or false on failure.
     */
  }
}

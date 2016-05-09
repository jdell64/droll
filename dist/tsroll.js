"use strict";
var DiceRoller;
(function (DiceRoller) {
    var DrollFormula = (function () {
        function DrollFormula(numDice, numSides, modifier) {
            this.numDice = numDice;
            this.numSides = numSides;
            this.modifier = modifier;
        }
        ;
        return DrollFormula;
    }());
    DiceRoller.DrollFormula = DrollFormula;
    var DrollResult = (function () {
        function DrollResult(rolls, modifier, total) {
            if (modifier === void 0) { modifier = 0; }
            if (total === void 0) { total = 0; }
            this.rolls = rolls;
            this.modifier = modifier;
            this.total = total;
            this.toString = function () {
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
            };
        }
        ;
        return DrollResult;
    }());
    DiceRoller.DrollResult = DrollResult;
    var Droll = (function () {
        function Droll() {
            this.parse = function (formula) {
                var pieces;
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
            this.roll = function (formula) {
                var pieces;
                var result = new DrollResult([], 0, 0);
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
            this.validate = function (formula) {
                return (this.parse(formula)) ? true : false;
            };
        }
        return Droll;
    }());
    DiceRoller.Droll = Droll;
})(DiceRoller = exports.DiceRoller || (exports.DiceRoller = {}));

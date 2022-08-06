//Genrator random number
const getRandomValue = (min, max) =>
    Math.floor(Math.random() * max - min + min);

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            playerMonster: 100,
            currentRound: 0,
            winner: null,
            logMessage: [],
        };
    },
    methods: {
        attackMonter() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 7);
            this.playerMonster -= attackValue;
            this.addLogMessage("Player", "attack", attackValue);
            this.attackHealth();
        },
        attackHealth() {
            const attackValue = getRandomValue(8, 15);
            console.log(attackValue);
            this.playerHealth -= attackValue;
            this.addLogMessage("Monster", "attack", attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.playerMonster -= attackValue;
            this.addLogMessage("Player", "attack", attackValue);
            this.attackHealth();
        },
        healPlayer() {
            this.currentRound++;

            const healValue = getRandomValue(8, 20);

            if ((this.playerHealth += healValue > 100)) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }

            this.addLogMessage("Player", "Heal", healValue);

            this.attackHealth();
        },
        startNewGame() {
            (this.playerHealth = 100),
            (this.playerMonster = 100),
            (this.currentRound = 0),
            (this.winner = null),
            (this.logMessage = []);
        },
        surrender() {
            this.winner = "Monster";
        },
        addLogMessage(who, happen, value) {
            this.logMessage.unshift({
                actionBy: who,
                actioneType: happen,
                actionValue: value,
            });
        },
    },
    computed: {
        monsterStyelsBars() {
            if (this.playerMonster < 0) {
                return { width: 0 + "%" };
            } else {
                return { width: this.playerMonster + "%" };
            }
        },
        healthStylesBars() {
            if (this.playerHealth < 0) {
                return { width: 0 + "%" };
            } else {
                return { width: this.playerHealth + "%" };
            }
        },
        maySpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.playerMonster <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "Monster";
            }
        },

        playerMonster(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "Player";
            }
        },
    },
});

app.mount("#game");
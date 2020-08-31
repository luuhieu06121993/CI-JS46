import { answers } from "./answer.js";

class Form_Gameplay extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(document.getElementById("form-gameplay").content.cloneNode(true));
        this.$show = this._shadowRoot.getElementById("show");
        this.$btn = this._shadowRoot.getElementById("enter");
        this.$players = this._shadowRoot.getElementById("players");
        this.input = this._shadowRoot.getElementById("input");
        this.$texts = this._shadowRoot.getElementById("texts");

        this.i = Math.floor(Math.random() * answers.length);
        this.arrrandom = [];
        this.arrrandom.push(this.i);
        this.key = 1;
        
        this.show(answers[this.i]);
        this.render();
        this.abc(this.key);

        this.$btn.addEventListener("click", () => {
            let a = this.Searchs(this.input.value, answers[this.i].quen.toLowerCase());
            if (a[0] == "win") {
                for (let key = 0; key < answers[this.i].quen.length; key++) {
                    this._shadowRoot.getElementById(`${key}`).style.color = "black";
                }
                alert("You Win");
                while (this.arrrandom.indexOf(this.i) != -1) {
                    this.i = Math.floor(Math.random() * answers.length);
                }
                this.arrrandom.push(this.i);
                this.$texts.name = answers[this.i].answer;
                this.show(answers[this.i])
            } else {
                if (a.length == 0) {
                    alert(`ko co chu cai ${this.input.value} nao`);
                    this.loop += 1;
                    if (this.loop == 3) {
                        alert("ban da mat luot choi vong nay");
                    }
                    this.key += 1;
                    if (this.key > 3) {
                        this.key = 1;
                    };

                } else {
                    alert(`co ${a.length} chu cai ${this.input.value}`)
                    for (let key = 0; key < a.length; key++) {
                        this._shadowRoot.getElementById(`${a[key]}`).style.color = "black";
                    }
                    this.loop = 0;
                    this.loop=Number(this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point)+a.length*1000;
                    this._shadowRoot.querySelector(`form-player[key="${this.key}"]`).point=this.loop;
                }
            }
            this.abc(this.key);
        });
    }
    render() {
        for (let i = 1; i < 4; i++) {
            this.$players.innerHTML += `<form-player img="./images.jpg" name="hieu" point="1000" key="${i}" class="flex-1"></form-player>`;
        };
        this.$texts.name = answers[this.i].answer;
    };
    Searchs(input, answer) {
        let arr = [];
        if (input === answer) {
            arr.push("win")
        } else {
            if (input.length == 1) {
                let search = answer.indexOf(input);
                while (search != -1) {
                    arr.push(search);
                    search = answer.indexOf(input, search + 1);
                };
            };
        }
        return arr;
    }
    abc(key) {
        this.$players = this._shadowRoot.querySelector("#players");
        switch (key) {
            case 1:
                this.$players.querySelector(`form-player[key="${1}"]`).classList.add("borderred");
                this.$players.querySelector(`form-player[key="${2}"]`).classList.remove("borderred");
                this.$players.querySelector(`form-player[key="${3}"]`).classList.remove("borderred");
                break;

            case 2:
                this.$players.querySelector(`form-player[key="${1}"]`).classList.remove("borderred");
                this.$players.querySelector(`form-player[key="${2}"]`).classList.add("borderred");
                this.$players.querySelector(`form-player[key="${3}"]`).classList.remove("borderred");
                break;
            case 3:
                this.$players.querySelector(`form-player[key="${1}"]`).classList.remove("borderred");
                this.$players.querySelector(`form-player[key="${2}"]`).classList.remove("borderred");
                this.$players.querySelector(`form-player[key="${3}"]`).classList.add("borderred");
                break;
            default:
                break;
        };
    };
    show(answers) {
        let arr_answer = answers.quen.split("");
        this.$show.innerHTML = "";
        for (let i = 0; i < arr_answer.length; i++) {
            if (arr_answer[i] == " ") {
                this.$show.innerHTML += `<div id="${i}" class="show-answer hide flex-1">.</div>`
            } else {
                this.$show.innerHTML += `<div id="${i}" class="show-answer flex-1">${arr_answer[i]}</div>`;
            };
        };
    };

};
window.customElements.define("form-game", Form_Gameplay);
(function (){

    'use strict';

    class Search {
        constructor(data, input, output){
            this.data = data; 
            this.query = '';
            this.selection = '';
            this.input = input;
            this.output = output;
            this.matching = [];
        }


        findMatching(){
            this.matching = [];

            this.data.forEach( (city) => {
                for(let i = 0, l = city.alt.length; i < l; i++){
                    let cityName = city.alt[i];
                        cityName = cityName.toLowerCase();

                    if (cityName.search(this.query) !== -1){
                        this.matching.push(city.ref);
                        break;
                    }
                }
            });

            this.render();
        }

        performSearch(){
            this.input.addEventListener('input', (event) => {
                this.query = event.target.value;
                if (this.query.trim().length > 1){ 
                    this.findMatching();
                } else {
                    this.matching = [];
                    this.render();
                }
            });
        }

        render(){
            if (!this.matching.length){
                if (!this.query) {
                    this.output.innerText = '';
                } else if (this.query && this.query.length > 1) {
                    this.output.innerText = 'No matching results';
                }
                return;    
            } else {
                let listItems = '<ul>';

                this.matching.forEach( (item) => {
                    listItems += `<li>${item}</li>`
                });

                listItems += '</ul>';

                this.output.innerHTML = listItems;

                this.attachEvents();
            }

        }

        attachEvents(){
            let matchingList = document.querySelectorAll(`div#${this.output.id} li`);

            matchingList.forEach( (item) => {
                item.addEventListener('click', (event) => {
                    this.selection = event.target.textContent;
                    this.choseResult(this.selection);
                });
            });
        }

        choseResult(){
            this.input.value = this.selection;
            this.matching = [];
            this.query = '';
            this.render();
        }

        init(){
            this.performSearch();
        }
    }

    const seedDataObj = [
        {'ref': 'Mansoura', 'alt': ['el_mansoura', 'El Mansoura', 'المنصوره', 'mansora']},
        {'ref': 'Demuiat', 'alt': ['el_Demuiat', 'El Demuiat', 'Demuiata', 'domuat']},
        {'ref': 'monofia', 'alt': ['el_monofia', 'El monofia', 'monofua']},
        {'ref': 'kafr El Shakh', 'alt': ['kafr El Shakh', 'kaferel-shekh']},
        {'ref': 'ismaelia', 'alt': ['isma3elya', 'el ismaelea', 'el_ismaelia']},
        {'ref': 'EL sharkya', 'alt': ['Sharkia', 'el Sharkia',]},
        {'ref': 'EL Gharbya', 'alt': ['Gharbya', 'el-gharbya', 'الغربيه']}
    ];
    let input = document.querySelector('#input');
    let output = document.querySelector('#output');
    let citiesSearch = new Search(seedDataObj, input, output);
    citiesSearch.init();
})();


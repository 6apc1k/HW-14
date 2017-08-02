//Constructor for Casino
function Casino(machinesQt, moneyAmount) {

    if ((machinesQt <= 0 || isNaN(machinesQt)) || (moneyAmount <= 0 || isNaN(moneyAmount))) {
        console.log('Please, enter valid values');
        return;
    }
    this.machinesQt = machinesQt;
    this.moneyAmount = moneyAmount;
    this.slotMachines = generateMachines(machinesQt, moneyAmount);

    this.getTotalAmount = function() {
        this.moneyAmount = this.slotMachines.reduce(function(sum, current) {
            return {
                moneyAmount: sum.moneyAmount + current.moneyAmount
            };
        }).moneyAmount;
        console.log('You can withdraw from Casino:' + this.moneyAmount);
        return this.moneyAmount;
    }

    this.totalNumber = function() {

        this.amountOfSlots = this.slotMachines.length;
        console.log('Amount of SlotMachines: ' + this.amountOfSlots);
        return this;
    }

    this.add = function() {

        var richestMachine = this.slotMachines[0];
        var richestMachineIndex = 0;
        for (var i = 1; i < this.slotMachines.length; i++) {
            if (this.slotMachines[i].moneyAmount > richestMachine.moneyAmount) {
                richestMachine = this.slotMachines[i];
                richestMachineIndex = i;
            }
        }
        this.slotMachines.push(new SlotMachine(Math.floor(richestMachine.moneyAmount / 2)));
        this.machinesQt = this.slotMachines.length;
        this.slotMachines[richestMachineIndex].moneyAmount = Math.ceil(this.slotMachines[richestMachineIndex].moneyAmount / 2);
        return this;
    }

    this.removeByNumber = function(n) {
        if (isNaN(n) || n < 0 || n > this.slotMachines.length) {
            console.log('Invalid key');
            return;
        }
        var incomePerMachine = Math.round(this.slotMachines[n].moneyAmount / this.slotMachines.length - 1);
        this.slotMachines.splice(n, 1);
        for (var i = 0; i < this.slotMachines.length; i++) {
            this.slotMachines[i].moneyAmount += incomePerMachine;
        }
        this.machinesQt = this.slotMachines.length;
        return this;
    }

    this.takeMoney = function(amount) {
        if (isNaN(amount) || amount <= 0) {
            console.log('Put a valid amount');
            return;
        }
        this.totalAmount = this.getTotalAmount();
        if (amount > this.totalAmount) {
            console.log('Not enough money in Casino.');
            return;
        }
        console.log('You had withdrawn: ' + amount);

        var withdrawing = true;
        while (withdrawing) {
            var richestMachine = this.slotMachines[0];
            var richestMachineIndex = 0;
            for (var i = 1; i < this.slotMachines.length; i++) {
                if (this.slotMachines[i].moneyAmount > richestMachine.moneyAmount) {
                    richestMachine = this.slotMachines[i];
                    richestMachineIndex = i;
                }
            }
            if (amount > this.slotMachines[richestMachineIndex].moneyAmount) {
                amount -= this.slotMachines[richestMachineIndex].moneyAmount;
                this.slotMachines[richestMachineIndex].moneyAmount = 0;

            } else {
                this.slotMachines[richestMachineIndex].moneyAmount -= amount;
                withdrawing = false;
                totalAmount = this.getTotalAmount();
            }
        }
        return this;
    }

    return this;
}

//used in Casino to generate machines
function generateMachines(machinesQt, moneyAmount) {
    var slotMachines = [];
    var initialMoneyInMachine = Math.floor(moneyAmount / machinesQt);
    var initialMoneyFirstMachine = Math.floor(initialMoneyInMachine + (moneyAmount - initialMoneyInMachine * machinesQt));
    var luckyMachine = Math.floor(Math.random() * machinesQt);

    slotMachines.push(new SlotMachine(initialMoneyFirstMachine));

    for (var i = 1; i < machinesQt; i++) {
        slotMachines.push(new SlotMachine(initialMoneyInMachine));
    }
    slotMachines[luckyMachine].setLucky(true);
    return slotMachines;
}

//Constructor for single machine
function SlotMachine(moneyAmount) {

    this.moneyAmount = moneyAmount;

    if (moneyAmount < 0 || isNaN(moneyAmount)) {
        console.log('invalid amount entered');
        return;
    }

    var luckySlot = false;

    this.getLucky = function() {
        return luckySlot;
    }
    this.setLucky = function(value) {
        luckySlot = value;
    }

    this.get = function() {
        return this.moneyAmount;
    }

    this.takeMoney = function(amount) {
        if (isNaN(amount) || amount <= 0) {
            console.log('Put a valid amount');
            return;
        }
        if (this.moneyAmount === 0) {
            console.log('Machine is empty');
            return;
        }
        if (this.moneyAmount < amount) {
            console.log('You can get no more than ' + this.moneyAmount);
            return;
        }
        this.moneyAmount -= amount;
        console.log('You got ' + amount);
        console.log('Total amount remaining in Slot: ' + this.moneyAmount);
        return this;
    }

    this.putMoney = function(amount) {
        if (isNaN(amount) || amount <= 0) {
            console.log('Put a valid amount');
            return;
        }
        this.moneyAmount += amount;
        console.log('Total amount in slot machine: ' + this.moneyAmount);
        return this;
    }

    this.play = function(amount) {
        var randomNumber = Math.floor((Math.random() * 900) + 100);
        console.log(randomNumber);

        while (this.getLucky() && randomNumber == 777) {
            randomNumer = Math.floor((Math.random() * 900) + 100);;
        }
        if (amount <= 0 || isNaN(amount)) {
            console.log('Please, put some valid amount of money');
        } else {
            this.putMoney(amount);
            if (randomNumber === 777) {
                this.takeMoney(this.moneyAmount);
                return;
            } else {
                var sameNumbers = comparing(randomNumber);
                if (sameNumbers === 2) {
                    this.takeMoney(amount * 2);
                } else if (sameNumbers === 3) {
                    this.takeMoney(amount * 5);
                }
            }
        }

        function comparing(randomNumber) {
            var myArray = randomNumber.toString().split("");

            for (var i = 0; i < myArray.length; i++) {
                var sameNumbersArray = myArray.filter(function(elem) {
                    return elem === myArray[i];
                })
                var sameNumbers = sameNumbersArray.length;
                return sameNumbers;
            }
        }
        return this;
    }
}

function checkList() {
    //testing Casino class
    var test = new Casino(5, 157);
    console.log(test.slotMachines[0].moneyAmount, test.slotMachines[1].moneyAmount); //first machine has more money;

    for (var i = 0; i < test.machinesQt; i++) {
        console.log(test.slotMachines[i].getLucky()); // shows the lucky slot
    }

    test.getTotalAmount(); // shows how much money currently in Casino;
    test.totalNumber(); //shows number of slotMachines;
    test.add(); //adding 1 machine
    test.totalNumber(); //array is updated
    console.log(test.slotMachines[0].moneyAmount);
    console.log(test.slotMachines[test.slotMachines.length - 1].moneyAmount); // half of money from 1-st obj transfered to newly added obj
    test.removeByNumber(0);
    test.totalNumber();
    test.removeByNumber(12); //error, invalid key eneteres
    console.log(test.slotMachines[0].moneyAmount) //first obj in array has been deleted;
    console.log(test.slotMachines[test.slotMachines.length - 1].moneyAmount); //money divided between other machines;
    test.takeMoney(''); //error
    test.takeMoney('sd') //error
    test.takeMoney(200); //error not enough money in Casino
    test.takeMoney(100);
    console.log(test.slotMachines); //money has been evenly widthdrawn


    //testing slotMachine class

    var test2 = new SlotMachine(200);
    var testA = new SlotMachine('dss'); //error
    test2.get(); //initial amount put in machine
    test2.takeMoney(100);
    test2.get(); //-100
    test2.takeMoney(400); //error, not enough money
    test2.putMoney(150);
    test2.get(); // +150
    test2.takeMoney(-10); //error
    test2.putMoney(-20); //error
    test2.play(40); //repeat to win

}


module.exsports = {
    Casino: Casino,
    generateMachines: generateMachines,
    SlotMachine: SlotMachine,
    checkList: checkList
};

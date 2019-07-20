function Building(counter){
	this.counter = counter;
}

Building.prototype.getCount = function(){
	return this.counter;
}

function Flat(counter){
	Building.apply(this, arguments);
}

Flat.prototype = Object.create(Building.prototype);
Flat.prototype.constructor = Flat;

function Floor(arrayOfFlats){
	Building.apply(this);

	this.counter = getElementsCount(arrayOfFlats);
}

Floor.prototype = Object.create(Building.prototype);
Floor.prototype.constructor = Floor;

function Entrance(arrayOfFloors){
	Building.apply(this);

	this.counter = getElementsCount(arrayOfFloors);
}

Entrance.prototype = Object.create(Building.prototype);
Entrance.prototype.constructor = Entrance;

function House(arrayOfEntrances){
	Building.apply(this);

	this.counter = getElementsCount(arrayOfEntrances);
}

House.prototype = Object.create(Building.prototype);
House.prototype.constructor = House;

function getElementsCount(array){
	var sum = 0;

	array.forEach(function(element){
		sum+=element.getCount();
	});

	return sum;
}

var arrayOfFlats1 = [new Flat(1), new Flat(3)];
var floor1 = new Floor(arrayOfFlats1);
var arrayOfFlats2 = [new Flat(2), new Flat(4)];
var floor2 = new Floor(arrayOfFlats2);
var entrance1 = new Entrance([floor1, floor2]);

var arrayOfFlats3 = [new Flat(5), new Flat(6)];
var floor3 = new Floor(arrayOfFlats3);
var arrayOfFlats4 = [new Flat(7), new Flat(2)];
var floor4 = new Floor(arrayOfFlats4);
var entrance2 = new Entrance([floor3, floor4]);

var house = new House([entrance1, entrance2]);
console.log(house.getCount());
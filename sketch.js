// estrutura trainercard
var trainercard = [{
	'id': '',
     'name': '',
	'region': '',
	'hometown': '',
	'money': '',
	'pokedex': '',
	'badges': '',
	'trainer': '',
	'pokemon1': '',
	'pokemon2': '',
	'pokemon3': '',
	'pokemon4': '',
	'pokemon5': '',
	'pokemon6': ''}]

// arrays de cidade/regiao
var regions = [
	'Kanto',
	'Johto'];
var cities = [
	'Celadon City',
	'Azalea Town',
	'Cerulean City',
	'Blackthorn City',
	'Cinnabar Island',
	'Cherrygrove City',
	'Fuchsia City',
	'Cianwood City',
	'Lavender Town',
	'Ecruteak City',
	'Pallet Town',
	'Goldenrod City',
	'Pewter City',
	'Mahogany Town',
	'Safron City',
	'New Bark Town',
	'Vermilion City',
	'Olivine City',
	'Viridian City',
	'Violet City'];

// arrays de carga
let trainer = [];
var pokemon = [];
var badge = [];

// variaveis de carga
let card;
let myFont;

// precarga
function preload() {

	// carregando template do cartao
	card	= loadImage('card.png');

	// carregando treinadores
	for (m = 0; m < 107; m++){
		p = m+1;
		trainer[m] = loadImage('trainers/(' + p + ').png');
	}

	// carregando pokemons
	for (n = 0; n < 252; n++){
		pokemon[n] = loadImage('pokemons/(' + n + ').png')
	}

	// carregando insigneas (kanto)
	for(k = 0; k < 8; k++){
		y = k+1;
		badge[k] = loadImage('badges/kanto/(' + y + ').png');
	}

	// carregando insigneas (johto)
	for(k = 8; k < 16; k++){
		y = k-7;
		badge[k] = loadImage('badges/johto/(' + y + ').png');
	}

	// carregando fonte
	myFont = loadFont("Pokedex.ttf");

}

// variaveis de dimensoes
let canvasW = 456;
let canvasH = 432;

let pokegridW = 28;
let pokegridH = 222;

let offsetW = 84;
let offsetH = 68;

let size = 16;

// input
let input;

function setup() {

	// inicializando com um trainer card padrao
	CreateTrainer("");

	// inicializando tela
	var cnv = createCanvas(canvasW, canvasH);
	cnv.center('horizontal');

	// inicializando caixa de texto (input)
	input = createInput();
	input.position(432, 450);
	input.center('horizontal');

}

function draw() {

	// desenhando cartao
	image(card, 0, 0);

	// desenhando treinador
	image(trainer[trainercard.trainer], 260, 170);

	// desenhando pokemons
	image(pokemon[trainercard.pokemon1], pokegridW,				pokegridH);
	image(pokemon[trainercard.pokemon2], pokegridW + (offsetW),		pokegridH);
	image(pokemon[trainercard.pokemon3], pokegridW + (offsetW*2),	pokegridH);
	image(pokemon[trainercard.pokemon4], pokegridW,				pokegridH + (offsetH));
	image(pokemon[trainercard.pokemon5], pokegridW + (offsetW),		pokegridH + (offsetH));
	image(pokemon[trainercard.pokemon6], pokegridW + (offsetW*2),	pokegridH + (offsetH));

	// escolhendo fontes
	textFont(myFont);
	textSize(size);

	// ID
	text("IDNo. " + trainercard.id, 263, 42);
	// NOME
	text("NAME: " + trainercard.name, 45, 84);
	// ORIGEM
	text(trainercard.hometown + " (" + trainercard.region + ")", 45, 138); //
	// DINHEIRO
	text("MONEY: $" + trainercard.money, 45, 170);
	// POKEDEX
	text("POKEDéX: " + trainercard.pokedex, 45, 202);

	// desenhando insigneas
	let horizontal = 52;
	let offset = 48;
	for(j = 0; j < trainercard.badges; j++){
		image(badge[j], horizontal + (j*offset), 380);
	}

}

// funcao PNRG que usa o hash como seed para determinar o treinador
function CreateTrainer(name) {

	var hash = sha256(name);

	trainercard.name		= name;
	trainercard.region		= regions[(parseInt('0x' + hash.substring(0, 4)) % 2)];
	trainercard.hometown	= cities[(parseInt('0x' + hash.substring(0, 4)) % 10)];
	trainercard.money		= (parseInt('0x' + hash.substring(5, 9)) % 1000000);
	trainercard.pokedex		= (parseInt('0x' + hash.substring(10, 14)) % 252);
	trainercard.badges		= (parseInt('0x' + hash.substring(15, 19)) % 8) + 1;
	trainercard.trainer		= (parseInt('0x' + hash.substring(20, 24)) % 106);
	trainercard.pokemon1	= (parseInt('0x' + hash.substring(25, 29)) % 252);
	trainercard.pokemon2	= (parseInt('0x' + hash.substring(30, 34)) % 252);
	trainercard.pokemon3	= (parseInt('0x' + hash.substring(35, 39)) % 252);
	trainercard.pokemon4	= (parseInt('0x' + hash.substring(40, 44)) % 252);
	trainercard.pokemon5	= (parseInt('0x' + hash.substring(45, 49)) % 252);
	trainercard.pokemon6	= (parseInt('0x' + hash.substring(50, 54)) % 252);
	trainercard.id 		= (parseInt('0x' + hash.substring(55, 59)));

	return trainercard;
}

// funcao para calcular o hash (SHA-256)
var sha256 = function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};

	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;

	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}

	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)

	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj

			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}


	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}

	return result;
};

// chama CreateTrainer(input) toda vez que o teclado eh acionado
function keyReleased() {
	CreateTrainer(input.value());
}

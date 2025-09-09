import { pick } from '../src/object';
import { Translate } from '../src/translate';

test('translate default', () => {
	const trans = new Translate();

	expect(trans.chars('Привет')).toBe('privet');
	expect(trans.chars('')).toBe('');
	expect(trans.chars('?!\'')).toBe('');
	expect(trans.chars('А как у них?')).toBe('a_kak_y_nikh');

	expect(trans.chars('Охране посвящается!')).toBe('okhrane_posvyashchaetsya');
	expect(trans.chars('Дорожные "зайцы"!')).toBe('dorozhnue_zaitsu');
	expect(trans.chars('')).toBe('');
	expect(trans.chars('Могу я знать?')).toBe('mogy_ya_znat\'');
});

test('translate no replace spec', () => {
	const trans = new Translate({
		dictionary: {
			' ': '#',
		},
		specialSymbolsProps: {
			replace: false,
		},
	});

	expect(trans.chars('Что с нами?')).toBe('chto#s#nami?');
});

test('translate by words', () => {
	const trans = new Translate({
		dictionary: {
			'привет': 'hello',
			'пока': 'bye',
			'мир': 'world',
		},
	});

	expect(trans.word('привет')).toBe('hello');
	expect(trans.word('')).toBe('');
	expect(trans.chars('пока')).toBe('poka');
});

test('translate setDictionary', () => {
	const trans = new Translate();

	expect(trans.word('привет')).toBe('');
	expect(trans.chars('Могу я знать?')).toBe('mogy_ya_znat\'');

	trans.setDictionary({
		'привет': 'hello',
		'ъ': '',
		'ь': '',
		' ': '-',
	});

	expect(trans.word('привет')).toBe('hello');
	expect(trans.chars('Могу "я" знать?')).toBe('mogy-ya-znat');
});

test('translate toggleSpecialReplace', () => {
	const trans = new Translate();

	expect(trans.chars('Он, конечно, знает?')).toBe('on_konechno_znaet');
	expect(trans.chars('?,"\'')).toBe('');
	trans.toggleSpecialReplace();
	expect(trans.chars('Он, конечно, знает?')).toBe('on,_konechno,_znaet?');
	expect(trans.chars('?\',"')).toBe('?\',"');
});

test('translate dictionary', () => {
	const trans = new Translate();
	expect(pick(trans.getDictionary(), ['а', 'я'])).toEqual({ а: 'a', я: 'ya' });

	trans.setDictionary({
		name: 'Joe',
	});
	expect(pick(trans.getDictionary(), ['а', 'я', 'name'])).toEqual({ а: 'a', я: 'ya', name: 'Joe' });

	trans.resetDictionary();
	expect(pick(trans.getDictionary(), ['name'])).toEqual({});
});

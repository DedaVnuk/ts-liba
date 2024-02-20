const defaultDictionary = {
	'а': 'a',
	'б': 'b',
	'в': 'v',
	'г': 'g',
	'д': 'd',
	'е': 'e',
	'ё': 'e',
	'ж': 'zh',
	'з': 'z',
	'и': 'i',
	'й': 'i',
	'к': 'k',
	'л': 'l',
	'м': 'm',
	'н': 'n',
	'о': 'o',
	'п': 'p',
	'р': 'r',
	'с': 's',
	'т': 't',
	'у': 'y',
	'ф': 'f',
	'х': 'kh',
	'ц': 'ts',
	'ч': 'ch',
	'ш': 'sh',
	'щ': 'shch',
	'ъ': 'ʺ',
	'ы': 'u',
	'ь': 'ʹ',
	'э': 'ė',
	'ю': 'yu',
	'я': 'ya',
	' ': '_',
} as const;

const defaultSpecialSymbolProps = {
	replace: true,
	replacer: '',
};

type Dictionary = Record<string, string>;

type ConstructorProps = {
	dictionary?: Dictionary;
	specialSymbolsProps?: {
		replace?: boolean;
		replacer?: string;
	};
};

export class Translate {
	private dictionary: Dictionary = Object.create(defaultDictionary);
	private specialSymbolsProps = Object.create(defaultSpecialSymbolProps);

	constructor(props?: ConstructorProps) {
		this.dictionary = Object.assign(this.dictionary, props?.dictionary);
		this.specialSymbolsProps = Object.assign(this.specialSymbolsProps, props?.specialSymbolsProps);
	}

	setDictionary(dictionary: Dictionary) {
		Object.assign(this.dictionary, dictionary);
		return this;
	}

	getDictionary() {
		return this.dictionary;
	}

	resetDictionary() {
		this.dictionary = Object.create(defaultDictionary);
		return this;
	}

	toggleSpecialReplace() {
		this.specialSymbolsProps.replace = !this.specialSymbolsProps.replace;
		return this;
	}

	/**
	 * Translate string char by char
	 * @param str
	 * @returns
	 */
	chars(str: string) {
		let result = '';

		for(let i = 0; i < str.length; i++) {
			const char = str[i]!.toLocaleLowerCase();

			if(this.dictionary[char]) {
				result += this.dictionary[char];
			} else {
				result += this.replacer(char);
			}
		}

		return result;
	}

	/**
	 * Find string translate in dictionary
	 * @param word
	 * @returns
	 */
	word(word: string) {
		return this.dictionary[word] ?? '';
	}

	private replacer(char: string) {
		return this.specialSymbolsProps.replace
			? char.replace(/[?!,'"]/, this.specialSymbolsProps.replacer)
			: char;
	}
}

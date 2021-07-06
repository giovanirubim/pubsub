class RandomGenerator {
	constructor({ min, max, stability = 0 }) {
		this.min = min;
		this.range = max - min;
		this.stability = stability;
		this.current = Math.random()*this.range + min;
	}
	next() {
		const { min, range, stability, current } = this;
		const rand = Math.random()*range + min;
		const value = current*stability + rand*(1 - stability);
		this.current = value;
		return value;
	}
}

module.exports = RandomGenerator;

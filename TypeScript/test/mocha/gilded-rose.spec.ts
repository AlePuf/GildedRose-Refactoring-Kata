import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    // given
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    // when
    const items = gildedRose.updateQuality();
    // then
    expect(items[0].name).to.equal('foo');
  });

  it('should degrade', () => {
    // given
    const gildedRose = new GildedRose([new Item('Cheese', 5, 20)]);
    // when
    const items = gildedRose.updateQuality();
    // then
    expect(items[0].quality).to.equal(19);
  });

  it('should degrade twice as fast past the expiration date', () => {
    // given
    const gildedRose = new GildedRose([new Item('Cheese', 0, 20)]);
    // when
    const items = gildedRose.updateQuality();
    // then
    expect(items[0].quality).to.equal(18);
  });

  it('should not have negative quality', () => {
    // given
    const gildedRose = new GildedRose([new Item('test', 0, 0)]);
    // when
    const items = gildedRose.updateQuality();
    // then
    expect(items[0].quality).to.equal(0);
  });

  it('should not increase quality past 50', () => {
    // given
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 50)]);
    // when
    const items = gildedRose.updateQuality();
    // then
    expect(items[0].quality).to.equal(50);
  });

  describe('Aged Brie', () => {
    it('should increase quality', () => {
      // given
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 25)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(26);
    });

    it('should increase quality by 2 past sellIn', () => {
      // given
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 30)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(32);
    });
  });

  describe('Sulfuras', () => {
    it('should not decrease quality', () => {
      // given
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 30, 50)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(50);
    });

    it('should not decrease sellIn', () => {
      // given
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 30, 50)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].sellIn).to.equal(30);
    });
  });

  describe('Backstage passes', () => {
    it('should increase quality', () => {
      // given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 30)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(31);
    });

    it('should increase quality by 2 when 10 days are left', () => {
      // given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(32);
    });

    it('should increase quality by 3 when 5 days are left', () => {
      // given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(43);
    });

    it('should set quality to 0 after the date', () => {
      // given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 30)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Conjured', () => {
    it('should decrease quality by 2', () => {
      // given
      const gildedRose = new GildedRose([new Item('Conjured', 10, 30)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(28);
    });

    it('should decrease quality by 4 past sellIn', () => {
      // given
      const gildedRose = new GildedRose([new Item('Conjured', 0, 30)]);
      // when
      const items = gildedRose.updateQuality();
      // then
      expect(items[0].quality).to.equal(26);
    });
  });
});

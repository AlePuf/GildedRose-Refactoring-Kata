export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  min(a: number, b: number) {
    return (a < b) ? a : b;
  }

  max(a: number, b: number) {
    return (a > b) ? a : b;
  }

  updateAgedBrie(item: Item) {
    if (item.sellIn < 0) {
      item.quality += 2;
    } else {
      item.quality++;
    }
  }

  updateBackstagePass(item: Item) {
    if (item.sellIn > 10) {
      item.quality++;
    } else if (item.sellIn > 5) {
      item.quality += 2;
    } else if (item.sellIn > 0) {
      item.quality += 3;
    } else {
      item.quality = 0;
    }
  }

  updateConjured(item: Item) {
    if (item.sellIn > 0) {
      item.quality -= 2;
    } else {
      item.quality -= 4;
    }
  }

  updateDefault(item: Item) {
    if (item.sellIn > 0) {
      item.quality--;
    } else {
      item.quality -= 2;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn--;
      }
      switch(this.items[i].name) {
        case 'Aged Brie':
          this.updateAgedBrie(this.items[i]);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstagePass(this.items[i]);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          break;
        case 'Conjured':
          this.updateConjured(this.items[i]);
          break;
        default:
          this.updateDefault(this.items[i]);
          break;
      }

      this.items[i].quality = this.min(50, this.max(0, this.items[i].quality));
    }
    return this.items;
  }
}

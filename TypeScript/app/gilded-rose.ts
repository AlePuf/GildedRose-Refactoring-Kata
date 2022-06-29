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

enum Type {
  Brie = 'Aged Brie',
  Backstage = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  Conjured = 'Conjured'
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
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
    for (let item of this.items) {
      if (item.name != Type.Sulfuras) {
        item.sellIn--;
      }
      switch(item.name) {
        case Type.Brie:
          this.updateAgedBrie(item);
          break;
        case Type.Backstage:
          this.updateBackstagePass(item);
          break;
        case Type.Sulfuras:
          break;
        case Type.Conjured:
          this.updateConjured(item);
          break;
        default:
          this.updateDefault(item);
          break;
      }

      item.quality = Math.min(50, Math.max(0, item.quality));
    }
    return this.items;
  }
}

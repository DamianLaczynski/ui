import 'zone.js';
import 'zone.js/testing';

if (typeof DragEvent === 'undefined') {
  (globalThis as unknown as { DragEvent: typeof Event }).DragEvent = class DragEvent extends Event {
    dataTransfer: DataTransfer | null = null;
    constructor(type: string, eventInit?: DragEventInit) {
      super(type, eventInit);
      this.dataTransfer = eventInit?.dataTransfer ?? null;
    }
  } as unknown as typeof DragEvent;
}

if (typeof DataTransfer === 'undefined') {
  (globalThis as unknown as { DataTransfer: typeof Object }).DataTransfer = class DataTransfer {
    dropEffect = 'none';
    effectAllowed = 'none';
    files = [] as unknown as FileList;
    items = [] as unknown as DataTransferItemList;
    types: string[] = [];
    private _data: Record<string, string> = {};
    setData(format: string, data: string): void {
      this._data[format] = data;
      this.types.push(format);
    }
    getData(format: string): string {
      return this._data[format] ?? '';
    }
    clearData(): void {
      this._data = {};
      this.types = [];
    }
  } as unknown as typeof DataTransfer;
}

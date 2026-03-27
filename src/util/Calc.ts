export class Calc {
  static bytesToFileSize(bytes: number): string {
    const kb: number = bytes / 1024;
    if (kb <= 1024) {
      return kb.toFixed() + " KB";
    }
    const mb: number = kb / 1024;
    if (mb <= 1024) {
      return mb.toFixed() + " MB";
    }
    const gb: number = mb / 1024;
    if (gb <= 1024) {
      return gb.toFixed() + " GB";
    }
    const tb: number = gb / 1024;
    return tb.toFixed() + " TB";
  }
}
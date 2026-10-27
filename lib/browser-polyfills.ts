if (!URL.canParse) {
  URL.canParse = (url, base) => {
    try {
      return Boolean(new URL(url, base));
    } catch {
      return false;
    }
  };
}

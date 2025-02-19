export const getTreeImageAlias = (level: number) => {
  switch (true) {
    case level > 1 && level < 5:
      return 'tree-level-1';
    case level >= 5 && level < 10:
      return 'tree-level-2';
    case level >= 10 && level < 15:
      return 'tree-level-3';
    case level >= 15 && level < 20:
      return 'tree-level-4';
    default:
      return 'tree-level-1';
  }
};

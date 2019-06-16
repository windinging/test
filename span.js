export const spanColumns = (arr: any[]) => {
  var hash: any = {};
  const spanPermissions: IPermission[] = [];
  let cellSpan: string[] = [];
  arr.forEach(item => {
    if (!hash[item.module]) {
      hash[item.module] = true;
      const moduleLength = arr.filter(data => data.module === item.module)
        .length;
      cellSpan.push(`value==='${item.module}'`);
      spanPermissions.push({
        ...item,
        length: moduleLength
      });
    }
  });

  const newPermissionColumns = permissionColumns.slice(0);
  newPermissionColumns[0] = {
    ...newPermissionColumns[0],
    cellClassRules: {
      "cell-span": cellSpan.join(" || ")
    },
    rowSpan: props => {
      if (
        props.data.module === "User Access Control" &&
        props.data.page === "Operator"
      ) {
        return 3;
      }
      spanPermissions.forEach(item => {
        if (
          props.data.module === item.module &&
          props.data.page === item.page
        ) {
          return item.length;
        }
      });
      return 1;
    }
  };
  return newPermissionColumns.map(item => ({
    ...item
  }));
};

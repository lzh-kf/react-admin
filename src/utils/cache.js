const map = {
    0: localStorage,
    1: sessionStorage
  };
  
  const getValue = (key, type) => {
    const value = map[type][key];
    return value ? JSON.parse(value) : undefined;
  };
  
  const setValue = (key, value, type) => {
    // 如果需要删除 则直接设置值为undefined即可
    if (undefined === value) {
      map[type].removeItem(key);
    } else {
      map[type][key] = JSON.stringify(value)
    }
    return true;
  };
  
  const getProxy = (type, StorageData) => {
    return new Proxy(StorageData, {
      get (target, key) {
        return getValue(key, type);
      },
      set (target, key, value) {
        return setValue(key, value, type);
      }
    }
    );
  };
  
  // Storage工具类
  const [setLocal, setSession] = [getProxy(0, {}), getProxy(1, {})];
  
  export { setLocal, setSession };
  
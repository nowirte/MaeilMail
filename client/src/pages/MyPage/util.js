const objChangedarr = obj => {
  const result = [];
  const keys = Object.keys(obj);

  keys.forEach(key => {
    const element = {};
    element.value = key;
    element.label = key.charAt(0).toUpperCase() + key.slice(1);
    // element.name = '';
    element.selected = obj[key];
    result.push(element);
  });
  return result;
};

const favorChangedName = arr => {
  arr.map(el => {
    switch (el.value) {
      case 'art':
        el.label = '예술';
        break;
      case 'book':
        el.label = '독서';
        break;
      case 'coding':
        el.label = '코딩';
        break;
      case 'entertainment':
        el.label = '예능';
        break;
      case 'fantacy':
        el.label = '판타지';
        break;
      case 'fashion':
        el.label = '패션';
        break;
      case 'game':
        el.label = '게임';
        break;
      case 'language':
        el.label = '언어';
        break;
      case 'movie':
        el.label = '영화';
        break;
      case 'music':
        el.label = '노래';
        break;
      case 'sports':
        el.label = '스포츠';
        break;
      case 'travel':
        el.label = '여행';
        break;
      default:
        el.value;
    }
  });
};

const langChangedName = arr => {
  arr.map(el => {
    switch (el.value) {
      case 'afrikaans':
        el.name = '아프리카어';
        break;
      case 'chinese':
        el.name = '중국어';
        break;
      case 'english':
        el.name = '영어';
        break;
      case 'french':
        el.name = '프랑스어';
        break;
      case 'german':
        el.name = '독일어';
        break;
      case 'japanese':
        el.name = '일본어';
        break;
      case 'korean':
        el.name = '한국어';
        break;
      case 'russian':
        el.name = '러시안어';
        break;
      case 'Spanish':
        el.name = '스페인어';
        break;
      case 'uzbek':
        el.name = '우즈베키스탄어';
        break;
      default:
        el.value;
    }
  });
};

export { objChangedarr, favorChangedName, langChangedName };

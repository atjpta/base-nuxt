import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale(vi);
class myMixin {
  public static getDate = (time: string) => {
    return dayjs(time).format('DD/MM/YYYY');
  };

  public static setTime(time: string) {
    dayjs.extend(relativeTime);
    return dayjs(time).fromNow();
  }

  public static getDayFromNow(day: string, prefix: false) {
    const now = new Date();
    const date = new Date(day);

    if (date < now) {
      return '-';
    }
    return dayjs(day).fromNow(prefix);
  }

  public static countTimesDuplicateInString = (str: string, char: string) => {
    const regex = new RegExp(char, 'g');
    const matches = str.match(regex);
    return matches ? matches.length : 0;
  };

  public static getValueMidEnd = (str: string) => {
    const indexLast = str.lastIndexOf('/');

    if (indexLast !== -1) {
      const indexStart = str.lastIndexOf('/', indexLast - 1);
      if (indexStart !== -1) {
        const valueMid = str.substring(indexStart + 1, indexLast);
        return valueMid;
      }
    }
    return null;
  };

  public static getValueMid = (str: string, indexChar: number) => {
    const parts = str.split('/');

    if (parts.length >= indexChar) {
      const valueMid = parts[indexChar];
      return valueMid;
    }

    return null;
  };

  public static testAwait = async (time = 2000) => {
    return await new Promise((resolve) => setTimeout(resolve, time));
  };
}

export default myMixin;

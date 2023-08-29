import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
dayjs.locale(vi);
class myMixin {
  public static getDate = (time: string) => {
    return dayjs(time).format('DD/MM/YYYY');
  };
}

export default myMixin;

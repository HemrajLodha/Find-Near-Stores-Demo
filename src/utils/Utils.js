import {base_image_url} from "../api/api";

export class Utils {

    static isNull(data) {
        return data === 'null' || data === null || data === undefined || data === '';
    }

    static isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    static stripHtml = (html) => {
        try {
            let str = html.toString();
            str = str.replace(/<(?:.|\s)*?>|(?:&nbsp;)/g, "");
            return str || "";
        } catch (err) {
            console.log('err', err)
            return "";
        }
    };

    static getDateString = (dateString) => {
        try {
            let date = new Date(dateString);
            return Utils.formatDateDigit(date.getDate()) + "," + Utils.getMonthString(date.getMonth()) + ", " + date.getFullYear();
        } catch (err) {
            return "";
        }
    };

    static getMonthString = (index) => {
        try {
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[index];
        } catch (err) {
            return "";
        }
    };

    static formatDateDigit = (date) => {
        try {
            return ("0" + date).slice(-2);
        } catch (err) {
            return "";
        }
    }

    static getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

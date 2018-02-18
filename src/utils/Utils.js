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


    static getDateInMilliesFromHours = (hour, minutes) => {
        try {
            let date = new Date();
            date.setHours(hour, minutes, 0);
            return date.getTime();
        } catch (err) {
            return "";
        }
    };

    static getTimeIn24Hours = (time) => {
        let hours = Number(time.match(/^(\d+)/)[1]);
        let minutes = Number(time.match(/:(\d+)/)[1]);
        let AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM === "PM" && hours < 12) hours = hours + 12;
        if (AMPM === "AM" && hours === 12) hours = hours - 12;
        let sHours = hours.toString();
        let sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return sHours + ":" + sMinutes;
    };

    static getCurrentDay = () => {
        try {
            let date = new Date();
            return date.getDay();
        } catch (err) {
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

    static getDayIndex = (day) => {
        try {
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return days.indexOf(day);
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
    };

    static getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

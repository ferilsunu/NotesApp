const moment = require('moment')

module.exports = {
    /*----------- Select Helper -----------*/
    select: function(selected, options) {
        if (!options || !options.fn) return ''
        return options.fn(this)
            .replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"')
            .replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&')
    },

    /*----------- GenerateDate Helper -----------*/
    GenerateDate: function(date, format) {
        if (!date) return ''
        return moment(date).format(format || 'DD MMMM YYYY')
    },

    /*----------- Relative Time Helper -----------*/
    timeAgo: function(date) {
        if (!date) return 'Recently'
        return moment(date).fromNow()
    },

    /*----------- Strip HTML Tags -----------*/
    stripTags: function(input) {
        if (!input) return ''
        return input.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ').trim()
    },

    /*----------- Truncate Text -----------*/
    truncate: function(str, len) {
        if (!str) return ''
        const clean = str.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
        const length = typeof len === 'number' ? len : 110
        if (clean.length <= length) return clean
        return clean.substring(0, length) + '...'
    },

    /*----------- User Initials -----------*/
    initials: function(name) {
        if (!name) return 'U'
        const parts = name.trim().split(/\s+/)
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    },

    /*----------- Strict Equality Helper -----------*/
    eq: function(a, b) {
        return a === b
    },

    /*----------- Greater Than Helper -----------*/
    gt: function(a, b) {
        return Number(a) > Number(b)
    },

    /*----------- Safe JSON Stringify -----------*/
    json: function(context) {
        return JSON.stringify(context || '')
    }
}
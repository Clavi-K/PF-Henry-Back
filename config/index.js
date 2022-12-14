module.exports = {
    atlas: {
        SCHEMA: process.env.ATLASSCHEMA,
        USER: process.env.ATLASUSER,
        PASSWORD: process.env.ATLASPASSWORD,
        DATABASE: process.env.ATLASDATABASE,
        OPTIONS: process.env.ATLASOPTIONS,
        HOSTNAME: process.env.ATLASHOSTNAME
    },
    moviesApi: {
        MOVIESPOPULARURL: process.env.MOVIESPOPULARURL,
        SEARCHURL: process.env.MOVIESSEARCHURL,
        GETMOVIE: process.env.GETMOVIE,
        GENRESURL: process.env.GENRESURL,
        GETUPCOMINGURL: process.env.GETUPCOMINGURL
    }
}
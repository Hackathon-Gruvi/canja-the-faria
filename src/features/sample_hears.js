const { findCommand } = require('../commands/find');

module.exports = function (controller) {

    // use a function to match a condition in the message
    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
        await bot.reply(message, 'I heard "foo" via a function test');
    });

    // use a function to match a condition in the message
    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'test', ['message'], async (bot, message) => {
        await bot.reply(message, 'tested');
    });

    // use a regular expression to match the text of the message
    controller.hears(new RegExp(/^\d+$/), ['message', 'direct_message'], async function (bot, message) {
        await bot.reply(message, { text: 'I heard a number using a regular expression.' });
    });

    // use a regular expression to match the text of the message
    controller.hears(new RegExp(/\bhelp\b/), ['message', 'direct_message'], async function (bot, message) {
        await bot.reply(message, {
            text: 'List of commands:\n' +
                '* find [genres,] [location]: Finds film festivals matching the given genres and location\n' +
                '* list genres: Lists all known film genres associated with a film festival\n' +
                '* list locations: Lists all possible locations hosting a film festival\n' +
                '* help\n'
        });
    });

    // find festivals
    controller.hears(new RegExp(/\bfind\b/), ['message', 'direct_message'], async function (bot, message) {
        await bot.reply(message, { text: findCommand(message.text) });
    });

}
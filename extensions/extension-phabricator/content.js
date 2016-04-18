'use strict';

const url = 'https://webduck.nl/modus/';

// Find current ticket number by looking at the breadcrumbs.
function findTicket() {
    const $ticket = $('.phui-crumbs-view a[href^="/T"]');
    return $ticket.text().trim();
}

function onClick(e) {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
            action: 'claim',
            ticket: findTicket(),
        }),
    })
    .then(() => {
        $('body').append(`
            <div class="jx-notification-container _modus-request-notify">
                <div data-sigil="jx-notification" class="jx-notification jx-notification-alert">
                    Tag updated to ticket.
                </div>
            </div>
        `);
        // mwuahah
        setTimeout(() => {
            $('._modus-request-notify').remove();
        }, 3000);
    })
    .catch((err) => {
        console.log('Request to modus failed :(', err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const $sidebar = $('.phui-object-box .phabricator-action-list-view').first();
    if (!$sidebar.length) {
        console.log('Modus extension: could not find sidebar.');
        return;
    }

    $sidebar.append(`
        <li class="phabricator-action-view">
            <a href="#" class="phabricator-action-view-item _modus-start-time-tracking" data-sigil="workflow">
                <span class="visual-only phui-icon-view phui-font-fa fa-clock-o phabricator-action-view-icon" aria-hidden="true"></span>
                Apply ticket to tracking tag
            </a>
        </li>
    `);
    const $start = $sidebar.find('._modus-start-time-tracking');
    if ($start.dom[0]) {
        $start.dom[0].addEventListener('click', onClick, false);
    }
});

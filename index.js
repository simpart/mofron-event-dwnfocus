/**
 * @file mofron-event-dwnfocus/index.js
 * @brief mousepress focus event for mofron component
 * @license MIT
 */
const MouseDown = require('mofron-event-mousedown');


module.exports = class extends mofron.class.Event {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @short
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.modname("DownFocus");
	    //this.shortForm("");

            this.confmng().add("clickFlag", { type: "boolean", init: false });
            this.confmng().add("status", { type: "boolean", init: false });
            
	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    /**
     * event contents
     * 
     * @param (mofron.class.dom) target dom object
     * @type private
     */
    contents (tgt_dom) {
        try {
            let evt = this;
            tgt_dom.getRawDom().addEventListener(
                'mousedown',
                () => {
                    try {
                        evt.clickFlag(true);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                false
            );

            let win_clk = () => {
                try {
                    if ( (true === evt.status()) &&
                         (false === evt.clickFlag()) ) {
                        evt.execListener(false);
                        evt.status(false);
                    } else if ( (false === evt.status()) &&
                                (true === evt.clickFlag()) ) {
                        evt.execListener(true);
                        evt.status(true);
                    }
                    evt.clickFlag(false);
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            mofron.window.event(new MouseDown(win_clk));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * flag for target clicked
     *
     * @param (boolean) click flag
     * @return (boolean) click flag
     * @type private
     */
    clickFlag (prm) {
        try {
            return this.confmng("clickFlag", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * focus status flag setter/getter
     *
     * @param (boolean) focus status flag
     *                  undefined: call as getter
     * @return (boolean) focus status flag
     * @type function
     */
    status (prm) {
        try {
            return this.confmng("status", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

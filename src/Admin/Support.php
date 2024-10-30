<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Bloks_Admin_Support
 *
 * @package     Bloks
 * @subpackage  Admin
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Admin_Support
{
    const EMAIL_TO = 'info@bloks.co';
    const CC_TO = 'jet@aluent.com';

    /**
     * Initializes all of the partial classes.
     */
    public function __construct()
    {
        add_action('admin_menu', array($this, 'registerMenu'));
    }

    /**
     * Bloks register submenu
     */
    public function registerMenu()
    {
        $label = '<span class="title-support" style="color: #d54e21">Support</span>';
        add_submenu_page(
            'edit.php?post_type=' . Bloks_LandingPage::POST_TYPE,
            __('Support', BLOKS_TEXTDOMAIN),
            __($label, BLOKS_TEXTDOMAIN),
            'administrator',
            'menu_handle',
            array($this, 'renderForm')
        );
    }

    /**
     * Bloks render form to send email
     */
    function renderForm()
    {
        // @codingStandardsIgnoreStart
        ?>
        <div id="bloks-support">
            <h1>Contact Us with Our Team</h1>
            <div class="heading-title">
                <div>
                    <span>
                        We appreciate your feedback to make the plugin better.
                        Your idea will be discussed and implement to the
                        next version of Bloks.<br />
                        We’re also available for customer Bloks request.
                        Please post your idea in the form below.
                    </span>
                </div>
            </div>
            <div class="form">
                <form id="support-form" method="POST" role="form" enctype="multipart/form-data">
                    <div class="controls">
                        <div class="form-group">
                            <label for="subject">Subject
                                <span class="require">*</span>
                            </label>
                            <br/>
                            <input id="subject" name="subject" type="text" size="73" class="form-control" placeholder="Email subject" required/>
                        </div>
                        <div class="form-group">
                            <label for="form_message">Message</label>
                            <br/>
                            <textarea id="form_message" name="message"
                                  placeholder="Please send your message for our team..."
                                  rows="10" cols="75" required
                            ></textarea>
                        </div>
                        <button type="submit" class="btn btn-success btn-send"><?php _e('Send', BLOKS_TEXTDOMAIN)?></button>
                    </div>
                </form>
            </div>
        </div>
        <?php
        // @codingStandardsIgnoreEnd
        $this->_sendMail();
    }

    /**
     * Bloks send email
     */
    private function _sendMail()
    {
        $from_name = get_bloginfo('name');
        $from_email = get_bloginfo('admin_email');

        if (isset($_POST['send_email'])) {
            $to = $this::EMAIL_TO;
            $subject = isset($_POST['subject'])
                ? sanitize_text_field($_POST['subject']) : '';
            $message = isset($_POST['message'])
                ? sanitize_textarea_field($_POST['message']) : '';
            $headers = "From: " . $from_name .
                '<' . $from_email . ">\r\n" . $this::CC_TO;

            if (wp_mail($to, $subject, $message, $headers)) {
                $send_mail_message = '<div class="updated">'
                    . __('Thank you for your message. It has been sent !', 'Bloks') .
                    '</div>';
            } else {
                $send_mail_message = '<div class="error">'
                    . __('There was an error sending the message.', 'Bloks') . '</div>';
            }

            if ($send_mail_message) {
                echo $send_mail_message;
            }
        }
    }
}

<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_Actions
 *
 * @package     Bloks
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Actions
{
    /**
     * Action constructor.
     */
    public function __construct()
    {
        add_action('wp_ajax_nopriv_bloks-sendmail', array($this, 'ajaxSendmail'));
        add_action('wp_ajax_bloks-sendmail', array($this, 'ajaxSendmail'));
        add_action('wp_ajax_bloks-get-template', array($this,'ajaxGetTemplate'));
    }

    /**
     * Sendmail method use wp_mail
     */
    public function ajaxSendmail()
    {
        $result = array(
            'succeed' => true,
            'error' => ''
        );

        $emailAdmin = get_option('admin_email');
        $blogname = get_option('blogname', '');
        $data = $_POST;
        $headers = 'From '.$blogname;

        $nonce = sanitize_text_field($_GET['_wpnonce']);
        if (! wp_verify_nonce($nonce) ) {
            $result['succeed'] = false;
            $result['error'] = wp_verify_nonce($nonce);
            wp_send_json($result);
        }

        $fieldAdd = array();
        $fieldOriginal = array('action');
        foreach ($data as $key => $dt) {
            if (!in_array($key, $fieldOriginal)) {
                $fieldAdd[] = ucfirst(str_replace('_', ' ', $key)) .
                    ': ' . sanitize_text_field($dt);
            }
        }

        if ($fieldAdd) {
            $html = implode(PHP_EOL, $fieldAdd);
        } else {
            $html = 'Email no content!';
        }

        try {
            wp_mail($emailAdmin, $blogname, $html, $headers);
        } catch (Exception $e) {
            $result['succeed'] = false;
            $result['error'] = $e->getMessage();
        }

        wp_send_json($result);
    }

    /**
     * Get content template default
     */
    function ajaxGetTemplate() 
    {
        $template = BLOKS_ROOT_PATH.DS.
            'blocks' .DS. sanitize_text_field($_POST['type']).DS.
             sanitize_file_name($_POST['name']).'.html';
        $helper = new Bloks_Core_Block_Template_Processor($template);
        $content = $helper->getContent();
        wp_send_json($content);
    }
}
?>

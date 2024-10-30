<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_Admin_Settings
 *
 * @package     Bloks
 * @subpackage  Admin
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Admin_Settings extends Bloks_Core_Settings_Base
{
    /**
     * Bloks_Admin_Settings constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Method to prepare items to settings page
     */
    public function prepare()
    {
        $this->addGroup(
            array(
                'name'  => 'general',
                'title' => 'General'
            )
        );
        
        $this->addItem(
            'general',
            array(
                'name'      => 'google_api',
                'label'     => 'Google Maps API',
                'type'      => 'text',
                'size'      => '60',
                'default'   => 'AIzaSyDxSO87LidBPfrBwcaQ4zCCXakxCrxuTFM'
            )
        );
    }
}

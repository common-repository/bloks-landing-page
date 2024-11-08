<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_Core_Settings
 *
 * @package     Bloks
 * @subpackage  Core
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Core_Settings
{
    /**
     * Method to update Bloks theme options
     *
     * @param array $data
     * @return bool
     */
    public static function updateOptions($data = array())
    {
        $options = get_option(Bloks_Admin_Settings::OPTION_KEY)
            ? get_option(Bloks_Admin_Settings::OPTION_KEY) : array();
        $options = array_merge($options, $data);

        return update_option(Bloks_Admin_Settings::OPTION_KEY, $options);
    }

    /**
     * Method to get Bloks theme option
     *
     * @param string $key
     * @return bool|mixed
     */
    public static function getOption($key)
    {
        $options = get_option(Bloks_Admin_Settings::OPTION_KEY)
            ? get_option(Bloks_Admin_Settings::OPTION_KEY) : array();

        if (isset($options[$key])) {
            return $options[$key];
        }

        return false;
    }

    /**
     * Method to get Bloks theme options
     *
     * @return bool|mixed|array
     */
    public static function getOptions()
    {
        return get_option(Bloks_Admin_Settings::OPTION_KEY);
    }
}

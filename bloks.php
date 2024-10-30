<?php
/*
Plugin Name: Bloks Landing Page
Plugin URI: http://bloks.co/plugins/landing-page/
Description: Building your landing page in Wordpress with drag & drop frontend editing.
Author: Bloks Team
Author URI: http://bloks.co/
Text Domain: bloks
License: GNU Public License
License URI: https://opensource.org/licenses/gpl-license
Version: 1.0.1
*/

/**
 * Define constants
 */
defined('BLOKS_TEXTDOMAIN') || define('BLOKS_TEXTDOMAIN', 'bloks');
defined('DS') || define('DS', DIRECTORY_SEPARATOR);
defined('BLOKS_ROOT_PATH') || define('BLOKS_ROOT_PATH', dirname(__FILE__));
defined('BLOKS_ROOT_URL') || define('BLOKS_ROOT_URL', plugin_dir_url(__FILE__));

/**
 * Main instance of Bloks Framework.
 *
 * @author: Kend
 */
final class Bloks
{
    /**
     * The single instance of the class.
     *
     * @var Bloks
     */
    protected static $_instance = null;

    private $_builderFactory = null;
    private $_landingPageFactory = null;
    private $_widget = null;
    /**
     * Main Bloks Instance.
     *
     * Ensures only one instance of Bloks is loaded or can be loaded.
     *
     * @return Bloks - Main instance.
     */
    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    /**
     * Bloks constructor.
     */
    public function __construct()
    {
        /**
         * Trigger init event
         */
        do_action('bloks_init');

        /**
         * Register autoloader
         */
        spl_autoload_register(array($this, 'autoloader'));

        /**
         * Method to add activate option
         */
        add_action('admin_init', array($this, 'afterActivate'));

        /**
         * Activation hook
         */
        register_activation_hook(__FILE__, array($this, 'activate'));

        $this->_builderFactory = new Bloks_Builder();
        //$this->_widget = new Bloks_Widget();
        $this->_landingPageFactory = new Bloks_LandingPage();
        new Bloks_Admin_Settings();
        new Bloks_CustomBloks();
        new Bloks_Admin_Support();
        new Bloks_Actions();
    }

    /**
     * Method to get plugin current version
     *
     * @return mixed
     */
    public function getVersion() {
        $plugin_data = get_file_data(__FILE__ , array('Version' => 'Version'), 'plugin');
        return $plugin_data['Version'];
    }

    /**
     * Auto loader register
     *
     * @param string $class
     */
    public function autoloader($class)
    {
        // project-specific namespace prefix
        $prefix = 'Bloks';

        // base directory for the namespace prefix
        $base_dir = BLOKS_ROOT_PATH . DS . 'src';

        // does the class use the namespace prefix?
        $len = strlen($prefix);

        if (strncmp($prefix, $class, $len) !== 0) {
            // no, move to the next registered autoloader
            return;
        }

        // get the relative class name
        $relative_class = substr($class, $len);

        // replace the namespace prefix with the base directory, replace namespace
        // separators with directory separators in the relative class name, append
        // with .php
        $file = $base_dir . str_replace('_', '/', $relative_class) . '.php';

        // if the file exists, require it
        if (file_exists($file)) {
            require $file;
        }
    }

    /**
     * Method to get builder factory
     *
     * @return null|Bloks_Builder
     */
    public function getBuilderFactory()
    {
        return $this->_builderFactory;
    }

    /**
     * Method to get Landing page factory
     *
     * @return Bloks_LandingPage|null
     */
    public function getLandingPageFactory()
    {
        return $this->_landingPageFactory;
    }

    /**
     * @return Bloks_Widget|null
     */
    public function getWidget()
    {
        return $this->_widget;
    }

    /**
     * Method to redirect to options page after active plugin
     */
    public function afterActivate()
    {
        if (get_option('bloks_plugin_do_activation', false)) {
            delete_option('bloks_plugin_do_activation');

            /**
             * Flush rewrite rules
             * Fix issue custom post type in multi site
             */
            flush_rewrite_rules();

            /**
             * Redirect after activate
             */
            if(!isset($_GET['activate-multi'])) {
                wp_redirect(admin_url('edit.php?post_type=bloks-landing-page&page=bloks_options'));
            }
        }
    }

    /**
     * Plugin activation hook
     */
    public function activate()
    {
        add_option('bloks_plugin_do_activation', true);
    }
}


/**
 * Main instance of Bloks Framework..
 *
 * Returns the main instance of Bloks to prevent the need to use globals.
 *
 * @return Bloks
 */
function Bloks()
{
    return Bloks::instance();
}

// Global for backwards compatibility.
$GLOBALS['bloks'] = Bloks();
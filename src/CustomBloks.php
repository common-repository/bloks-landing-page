<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_CustomBloks
 *
 * @package     Bloks
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_CustomBloks
{
    const POST_TYPE = 'bloks-custom-blok';
    const CATEGORY = 'bloks-custom-category';

    /**
     * Bloks plugin custom constructor
     */
    public function __construct()
    {
        /**
         * Register post type and taxonomy for Custom Blocks
         */
        add_action('init', array($this, 'register'));

        /**
         * Activation hook
         */
        register_activation_hook(
            BLOKS_ROOT_PATH . DS . 'bloks.php',
            array($this, 'inActivation')
        );

        /**
         * Register theme actions
         */
        new Bloks_Admin_CustomBloks();
    }

    /**
     * Register activation hook
     */
    public function inActivation()
    {
        $this->register();
        // Create folder theme
        $upload_dir = wp_upload_dir();
        $baseDir = $upload_dir['basedir'] . '/bloks/';
        if (!is_dir($baseDir)) {
            mkdir($baseDir);
        }

        // check block categories default
        $categories = Bloks()->getBuilderFactory()->categories;
        foreach ($categories as $key => $title) {
            $term = get_term_by('slug', $key, self::CATEGORY);
            if ($term == false) {
                wp_insert_term(
                    $title,
                    self::CATEGORY,
                    array(
                        'slug' => $key
                    )
                );
            }
        }
    }

    /**
     * Bloks create post type
     */
    public function register()
    {
        register_taxonomy(
            self::CATEGORY,
            self::POST_TYPE, array(
                'hierarchical' => true,
                'labels' => '',
                'show_ui' => true,
                'show_in_nav_menus' => false,
                'show_admin_column' => false,
                'query_var' => true,
                'rewrite' => array('slug' => self::CATEGORY),
            )
        );

        register_post_type(
            self::POST_TYPE,
            array(
                'labels' => array(
                    'name' => __('Custom Bloks'),
                    'singular_name' => __('CustomBloks'),
                    'menu_position' => null,
                    'edit_item' => 'Edit Blok',
                    'add_new_item' => 'Add New Custom Blok'
                ),
                'public' => false,
                'show_ui' => true,
                'show_in_menu' => false,
                'has_archive' => false,
                'taxonomies' => array(self::CATEGORY),
                'supports' => array('title', 'thumbnail'),
            )
        );
    }
}

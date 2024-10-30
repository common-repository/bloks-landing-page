<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_LandingPage
 *
 * @package     Bloks
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_LandingPage
{
    const POST_TYPE = 'bloks-landing-page';
    // @codingStandardsIgnoreStart
    //const ADMIN_MENU_ICON = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEyMDIgMTE5NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0eWxlPi5maWxsLWNvbG9yLWljb257ZmlsbDojZmZmZmZmfTwvc3R5bGU+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGc+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9ImZpbGwtY29sb3ItaWNvbiIgeD0iMTAuNCIgeT0iOS4xIiB3aWR0aD0iMzQ5LjUiIGhlaWdodD0iMTAzOS44Ii8+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz0iZmlsbC1jb2xvci1pY29uIiB4PSIxMC44IiB5PSIxMDc0LjEiIHdpZHRoPSIxMTc4LjUiIGhlaWdodD0iMTE1LjkiLz4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPSJmaWxsLWNvbG9yLWljb24iIHg9IjM4OC42IiB5PSI5LjEiIHdpZHRoPSI4MDIiIGhlaWdodD0iNDM1LjciLz4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPSJmaWxsLWNvbG9yLWljb24iIHg9IjM4OC4zIiB5PSI0NzEuMSIgd2lkdGg9IjM4NS44IiBoZWlnaHQ9IjIzMC4xIi8+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz0iZmlsbC1jb2xvci1pY29uIiB4PSI4MDMuMyIgeT0iNDcxLjEiIHdpZHRoPSIzODUuOCIgaGVpZ2h0PSIyMzAuMSIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9ImZpbGwtY29sb3ItaWNvbiIgeD0iMzg4LjMiIHk9IjkxNS4xIiB3aWR0aD0iMzg1LjgiIGhlaWdodD0iMTMzLjEiLz4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPSJmaWxsLWNvbG9yLWljb24iIHg9IjgwMy41IiB5PSI5MTUuMSIgd2lkdGg9IjM4NS44IiBoZWlnaHQ9IjEzMy4xIi8+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBjbGFzcz0iZmlsbC1jb2xvci1pY29uIiB4PSIzODcuNSIgeT0iNzI5LjciIHdpZHRoPSIyNDkuNSIgaGVpZ2h0PSIxNTguNCIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9ImZpbGwtY29sb3ItaWNvbiIgeD0iNjY1LjEiIHk9IjcyOS43IiB3aWR0aD0iMjQ5LjUiIGhlaWdodD0iMTU4LjQiLz4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPSJmaWxsLWNvbG9yLWljb24iIHg9Ijk0MCIgeT0iNzI5LjciIHdpZHRoPSIyNDkuNSIgaGVpZ2h0PSIxNTguNCIvPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+';
    const ADMIN_MENU_ICON = BLOKS_ROOT_URL . 'assets/images/bloks.png';
    // @codingStandardsIgnoreEnd

    /**
     * Bloks plugin constructor
     */
    public function __construct()
    {
        /**
         * Register post type and taxonomy for Landing Page
         */
        add_action('init', array( $this, 'register' ));

        add_action('admin_menu', array($this, 'changeMenuLabel'), 9999);

        /**
         * Hooks to template include
         */
        add_filter(
            'template_include',
            array($this, 'templateInclude'),
            -1
        );

        /**
         * Add meta in page
         */
        add_filter(
        'wp_head',
        array($this, 'addMetaData')
        );

        /**
         * Enqueue scripts
         */
        add_action(
            'wp_enqueue_scripts',
            array($this, 'enqueueScripts')
        );

        add_action(
            'admin_enqueue_scripts',
            array($this, 'enqueueAdminScripts')
        );

        /**
         * Hook to remove all external javascript files
         */
        add_action(
            'wp_print_scripts',
            array($this, 'removeExternalScripts'),
            99
        );

        /**
         * Hook to remove all external stylesheet files
         */
        add_action(
            'wp_print_styles',
            array($this, 'removeExternalStyles'),
            99
        );

        add_action(
             'edit_form_after_title',
             array( $this, 'addButtonBuildPage' )
        );

        /**
         * Hook the_content
         */
        add_filter(
            'the_content',
            array($this, 'filterTheContent')
        );

        /**
         * Hide admin bar in builder page
         */
        add_filter(
            'show_admin_bar',
            array($this, 'showAdminBar')
        );

        /**
         * Replace edit page link to Bloks Builder in admin bar menu
         */
        add_action(
            'admin_bar_menu',
            array($this, 'addAdminBarMenu'),
            999
        );

        /**
         * Add builder link to page row actions
         */
        add_filter(
            'page_row_actions',
            array($this, 'addPageRowActions'),
            10,
            2
        );

        // Remove custom post from permalink
        add_filter(
            'post_type_link',
            array($this, 'postTypeLink'),
            10,
            2
        );

        add_action(
            'pre_get_posts',
            array($this, 'preGetPosts')
        );

        // remove auto add p tags
        add_action(
            'the_post',
            array($this,'bloksFormatting'),
            10,
            1
        );
        add_action(
            'wp_footer',
            array($this, 'addParamFrontend'),
            99
        );

        add_filter(
            'wp_insert_post_data',
            array($this, 'bloksPermalink'),
            10,
            2
        );

        add_filter(
            'get_sample_permalink_html',
            array($this, 'bloksEditSamplePermalink'),
            10,
            5
        );
    }

    /**
     * Edit sample permalink 
     * @param $return
     * @param $post_id
     * @param $new_title
     * @param $new_slug
     * @param $post
     * @return mixed
     */
    public function bloksEditSamplePermalink( $return, $post_id, $new_title, $new_slug, $post )
    {
        $return = str_replace('/' . $post->post_type . '/', '/', $return);
        return $return;
    }

    /**
     * Check permalink duplicate title with page
     * @param $data
     * @param $postarr
     * @return mixed
     */
    public function bloksPermalink($data, $postarr)
    {
        if( isset($data['post_name']) && empty($data['post_name']) && $data['post_status'] !== 'auto-draft' )
        {
            $args = array(
                'numberposts'       => -1,
                'post_type'        => 'page',
                'post_status'      => 'publish'
            );
            $posts_array = get_posts( $args );
            foreach ($posts_array AS $page){
                $slug = sanitize_title($data['post_title']);
                if( $slug === $page->post_name ) {
                    $data['post_name'] = $slug . "-" . $postarr['ID'];
                    break;
                }
            }
        }
        return $data;
    }

    /**
     * Bloks create post type
     */
    public function register()
    {
        register_post_type(
            self::POST_TYPE,
            array(
                'labels'            => array(
                    'name'          => __('Landing Pages'),
                    'singular_name' => __('LandingPage'),
                    'edit_item'     => 'Edit Page',
                    'add_new_item'  => 'Add New Landing Page'
                ),
                'menu_icon'         => self::ADMIN_MENU_ICON,
                'public'            => true,
                'has_archive'       => false,
                'show_in_menu '     => true,
                'menu_position'     => 2,
                'hierarchical'      => true, // Allow page levels
                'rewrite'           => array(
                    'with_front'    => false
                ),
                'supports'          => array('title')
            )
        );
    }

    /**
     * Method to change settings menu label
     */
    public function changeMenuLabel()
    {
        global $menu;

        foreach ($menu as $index => $item) {
            if($item[2] == 'edit.php?post_type=' . Bloks_LandingPage::POST_TYPE) {
                $menu[$index][0] = __('Bloks', BLOKS_TEXTDOMAIN);
            }
        }
    }

    /**
     * Method setup iframe for build layout
     *
     * @param string $template
     *
     * @return string
     */
    public function templateInclude($template)
    {
        if (self::isLandingPage()) {
            return BLOKS_ROOT_PATH . DS . 'landing-page.php';
        }

        return $template;
    }

    /**
     * Remove all javascript files.
     */
    public function removeExternalScripts() 
    {
        global $wp_scripts;

        if (self::isLandingPage() && !Bloks_Builder::isActive()) {
            $scripts = array(
                'bloks',
                'bloks-bootstrap',
                'bloks-plyr',
                'bloks-google-map',
                'bloks-tinycolor',
                'bloks-tooltipster'
            );

            if(self::isIframe()) {
                $scripts = array_merge(
                    array(
                    'jquery-ui-core',
                    'jquery-ui-slider',
                    'jquery-ui-sortable',
                    'bloks-iframe-script',
                    'media-editor',
                //                'media-audiovideo'
                ), $scripts
                    );
            }

            $wp_scripts->queue = $scripts;
        }
    }

    /**
     * Remove all stylesheet files.
     */
    public function removeExternalStyles() 
    {
        global $wp_styles;

        if (self::isLandingPage() && !Bloks_Builder::isActive()) {
            $styles = array(
                'bloks',
                'bloks-bootstrap',
                'bloks-fontawesome',
                'bloks-animate',
                'bloks-plyr',
                'bloks-tooltipster',
                'bloks-builder',
                'admin-bar'
            );

            if(self::isIframe()) {
                $styles = array_merge(
                    array(
                    'editor-buttons',
                    'media-views'
                ), $styles
                    );
            }

            $wp_styles->queue = $styles;
        }
    }

    /**
     * Enqueues admin scripts and styles
     */
    public function enqueueAdminScripts() 
    {
        global $post;

        if(is_admin()
            && ((isset($_GET['post_type'])
            && sanitize_text_field($_GET['post_type']) === self::POST_TYPE)
            || ($post && $post->post_type === self::POST_TYPE))
        ) {
            wp_enqueue_style(
                'bloks-admin',
                BLOKS_ROOT_URL . 'assets/css/admin.css',
                Bloks()->getVersion()
            );
        }
    }

    /**
     * Enqueues scripts and styles
     */
    public function enqueueScripts()
    {
        global $post;

        if (self::isLandingPage() && !Bloks_Builder::isActive()) {
            wp_enqueue_script(
                'bloks-bootstrap',
                BLOKS_ROOT_URL . 'vendor/bootstrap/dist/js/bootstrap.min.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-plyr',
                BLOKS_ROOT_URL . 'vendor/plyr/dist/plyr.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-bootstrap',
                BLOKS_ROOT_URL . 'vendor/bootstrap/dist/css/bootstrap.min.css',
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-fontawesome',
                BLOKS_ROOT_URL . 'vendor/font-awesome/css/font-awesome.min.css',
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-animate',
                BLOKS_ROOT_URL . 'vendor/animate.css/animate.min.css',
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-plyr',
                BLOKS_ROOT_URL . 'vendor/plyr/dist/plyr.css',
                Bloks()->getVersion()
            );

            $scripts = BLOKS_ROOT_URL . 'assets/js/scripts.min.js';
            $styles = BLOKS_ROOT_URL . 'assets/css/styles.min.css';

            if (file_exists(get_stylesheet_directory() . '/bloks/scripts.js')) {
                $scripts = get_stylesheet_directory() . '/bloks/scripts.js';
            } elseif (file_exists(get_template_directory() . '/bloks/scripts.js')) {
                $scripts = get_template_directory() . '/bloks/scripts.js';
            }

            if (file_exists(get_stylesheet_directory() . '/bloks/styles.css')) {
                $styles = get_stylesheet_directory() . '/bloks/styles.css';
            } elseif (file_exists(get_template_directory() . '/bloks/styles.css')) {
                $styles = get_template_directory() . '/bloks/styles.css';
            }

            wp_enqueue_script(
                'bloks',
                $scripts,
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_style(
                'bloks',
                $styles,
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-google-map',
                'https://maps.googleapis.com/maps/api/js?key='
                .Bloks_Core_Settings::getOption('google_api')
            );

            $custom_css = get_post_meta($post->ID, '_custom_css', true);
            if (! empty($custom_css) ) {
                wp_add_inline_style('bloks', $custom_css);
            }

            $custom_js = get_post_meta($post->ID, '_custom_js', true);
            if (! empty($custom_js) ) {
                wp_add_inline_script('bloks', $custom_js);
            }

            if(self::isIframe()) {
                wp_enqueue_script('jquery-ui-core');
                wp_enqueue_script('jquery-ui-slider');
                wp_enqueue_script('jquery-ui-sortable');

                wp_enqueue_media();

                wp_enqueue_script(
                    'bloks-tooltipster',
                    BLOKS_ROOT_URL
                        .'vendor/tooltipster/dist/js/tooltipster.bundle.min.js',
                    array('jquery'),
                    Bloks()->getVersion()
                );

                wp_enqueue_style(
                    'bloks-tooltipster',
                    BLOKS_ROOT_URL
                        .'vendor/tooltipster/dist/css/tooltipster.bundle.min.css',
                    Bloks()->getVersion()
                );

                wp_enqueue_script(
                    'bloks-tinycolor',
                    BLOKS_ROOT_URL . 'vendor/tinycolor/dist/tinycolor-min.js',
                    array('jquery'),
                    Bloks()->getVersion()
                );

                wp_enqueue_script(
                    'bloks-iframe-script',
                    BLOKS_ROOT_URL . 'assets/js/iframe.min.js',
                    array('jquery'),
                    Bloks()->getVersion()
                );

                wp_enqueue_style(
                    'bloks-builder',
                    BLOKS_ROOT_URL . 'assets/css/builder.min.css',
                    Bloks()->getVersion()
                );

                wp_enqueue_style('editor-buttons');
            }
        }
    }

    /**
     * Bloks add button build landing page
     */
    public function addButtonBuildPage()
    {
        global $post;
        if ($post->post_type == self::POST_TYPE
            && $post->ID != get_option('page_for_posts') ) {
	        // @codingStandardsIgnoreStart
            ?>
            <div id="bloks__admin-editor">
                <button type="submit" value="Bloks Editor" name="bloks_builder">
                    <span class="button button-primary">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 5630 1196" style="enable-background:new 0 0 5630 1196;" xml:space="preserve">
                            <g>
                                <g>
                                    <rect fill="#fff" x="10.4" y="9.1" width="349.5" height="1039.8"/>
                                    <rect fill="#fff" x="10.8" y="1074.1" width="1178.5" height="115.9"/>
                                    <rect fill="#fff" x="388.6" y="9.1" width="802" height="435.7"/>
                                    <rect fill="#fff" x="388.3" y="471.1" width="385.8" height="230.1"/>
                                    <rect fill="#fff" x="803.3" y="471.1" width="385.8" height="230.1"/>
                                    <rect fill="#fff" x="388.3" y="915.1" width="385.8" height="133.1"/>
                                    <rect fill="#fff" x="803.5" y="915.1" width="385.8" height="133.1"/>
                                    <rect fill="#fff" x="387.5" y="729.7" width="249.5" height="158.4"/>
                                    <rect fill="#fff" x="665.1" y="729.7" width="249.5" height="158.4"/>
                                    <rect fill="#fff" x="940" y="729.7" width="249.5" height="158.4"/>
                                </g>
                            </g>
                            <g>
                                <path fill="#fff" d="M1914.5,9.1c56.2,0,107.5,5,153.8,14.9c46.3,9.9,86,26.2,119.1,48.8c33.1,22.6,58.7,52.7,76.9,90.1
                                    c18.2,37.5,27.3,83.8,27.3,138.9c0,59.5-13.5,109.2-40.5,148.9c-27,39.7-67,72.2-119.9,97.6c72.8,21,127.1,57.6,162.9,110
                                    c35.8,52.4,53.8,115.5,53.8,189.4c0,59.5-11.6,111.1-34.7,154.6c-23.2,43.6-54.3,79.1-93.4,106.7c-39.2,27.6-83.8,48-134,61.2
                                    c-50.2,13.2-101.7,19.8-154.6,19.8h-572.3V9.1H1914.5z M1881.4,487.1c46.3,0,84.4-11,114.1-33.1c29.8-22,44.7-57.9,44.7-107.5
                                    c0-27.5-5-50.2-14.9-67.8c-9.9-17.6-23.2-31.4-39.7-41.3c-16.5-9.9-35.6-16.8-57.1-20.7c-21.5-3.9-43.8-5.8-67-5.8h-243.1v276.2
                                    H1881.4z M1896.3,988.2c25.4,0,49.6-2.5,72.8-7.4c23.2-5,43.5-13.2,61.2-24.8c17.6-11.6,31.7-27.3,42.2-47.1
                                    c10.5-19.8,15.7-45.2,15.7-76.1c0-60.6-17.1-103.9-51.3-129.8c-34.2-25.9-79.4-38.9-135.6-38.9h-282.8v324.2H1896.3z"/>
                                <path fill="#fff" d="M2724.6,8.3v1180.9h-234.9V8.3H2724.6z"/>
                                <path fill="#fff" d="M2914.8,576.4c20.9-55.7,50.7-103.1,89.3-142.2c38.6-39.1,84.9-69.5,138.9-91c54-21.5,114.7-32.3,181.9-32.3
                                    c67.2,0,128.2,10.8,182.8,32.3c54.6,21.5,101.2,51.8,139.8,91c38.6,39.2,68.4,86.6,89.3,142.2c20.9,55.7,31.4,117.7,31.4,186.1
                                    c0,68.4-10.5,130.1-31.4,185.2c-21,55.1-50.7,102.3-89.3,141.4c-38.6,39.2-85.2,69.2-139.8,90.1c-54.6,20.9-115.5,31.4-182.8,31.4
                                    c-67.3,0-127.9-10.5-181.9-31.4c-54-20.9-100.4-51-138.9-90.1c-38.6-39.1-68.4-86.3-89.3-141.4c-21-55.1-31.4-116.9-31.4-185.2
                                    C2883.4,694.2,2893.9,632.1,2914.8,576.4z M3128.2,862.6c6.6,32.5,17.9,61.8,33.9,87.7c16,25.9,37.2,46.6,63.7,62
                                    c26.5,15.5,59.5,23.2,99.2,23.2c39.7,0,73-7.7,100.1-23.2c27-15.4,48.5-36.1,64.5-62c16-25.9,27.3-55.1,33.9-87.7
                                    c6.6-32.5,9.9-65.9,9.9-100.1c0-34.2-3.3-67.8-9.9-100.9c-6.6-33.1-17.9-62.3-33.9-87.7c-16-25.4-37.5-46-64.5-62
                                    c-27-16-60.4-24-100.1-24c-39.7,0-72.8,8-99.2,24c-26.5,16-47.7,36.7-63.7,62c-16,25.4-27.3,54.6-33.9,87.7
                                    c-6.6,33.1-9.9,66.7-9.9,100.9C3118.2,796.7,3121.6,830.1,3128.2,862.6z"/>
                                <path fill="#fff" d="M4176.8,8.3v633.5l296.1-307.6h277.9l-322.5,314.3l358.9,540.9h-284.5l-234.9-382.1l-91,87.7v294.4h-234.9V8.3H4176.8z"/>
                                <path fill="#fff" d="M5067.4,976.7c10.5,18.2,24,33.1,40.5,44.7c16.5,11.6,35.6,20.1,57.1,25.6c21.5,5.5,43.8,8.3,67,8.3
                                    c16.5,0,33.9-1.9,52.1-5.8c18.2-3.9,34.7-9.9,49.6-18.2c14.9-8.3,27.3-19.3,37.2-33.1c9.9-13.8,14.9-31.1,14.9-52.1
                                    c0-35.3-23.4-61.7-70.3-79.4c-46.9-17.6-112.2-35.3-196-52.9c-34.2-7.7-67.6-16.8-100.1-27.3c-32.5-10.5-61.5-24.2-86.8-41.3
                                    c-25.4-17.1-45.8-38.6-61.2-64.5c-15.5-25.9-23.2-57.6-23.2-95.1c0-55.1,10.8-100.3,32.3-135.6c21.5-35.3,49.9-63.1,85.2-83.5
                                    c35.3-20.4,75-34.7,119.1-43c44.1-8.3,89.3-12.4,135.6-12.4c46.3,0,91.2,4.4,134.8,13.2c43.5,8.8,82.4,23.7,116.6,44.7
                                    c34.2,21,62.6,48.8,85.2,83.5c22.6,34.7,36.1,78.6,40.5,131.5h-223.3c-3.3-45.2-20.4-75.8-51.3-91.8c-30.9-16-67.3-24-109.2-24
                                    c-13.2,0-27.6,0.8-43,2.5c-15.5,1.7-29.5,5.2-42.2,10.8c-12.7,5.5-23.4,13.5-32.3,24c-8.8,10.5-13.2,24.6-13.2,42.2
                                    c0,21,7.7,38,23.2,51.3c15.4,13.2,35.6,24,60.4,32.3c24.8,8.3,53.2,15.7,85.2,22.3c32,6.6,64.5,13.8,97.6,21.5
                                    c34.2,7.7,67.5,17.1,100.1,28.1c32.5,11,61.5,25.6,86.8,43.8c25.4,18.2,45.7,40.8,61.2,67.8c15.4,27,23.2,60.4,23.2,100.1
                                    c0,56.2-11.3,103.4-33.9,141.4c-22.6,38-52.1,68.6-88.5,91.8c-36.4,23.2-78,39.4-124.9,48.8c-46.9,9.4-94.6,14.1-143.1,14.1
                                    c-49.6,0-98.2-5-145.6-14.9c-47.4-9.9-89.6-26.5-126.5-49.6c-37-23.2-67.3-53.8-91-91.8c-23.7-38-36.7-85.7-38.9-143.1h223.3
                                    C5051.7,936.8,5056.9,958.5,5067.4,976.7z"/>
                            </g>
                        </svg>
                    </span>
                </button>
            </div>
            <?php
	        // @codingStandardsIgnoreEnd
        }
    }

    /**
     * Method prepare the_content
     *
     * @param string $content
     * @return string
     */
    public function filterTheContent( $content )
    {
        global $post;

        if(get_the_ID()
            && $post->post_type == self::POST_TYPE
            && isset($_GET['iframe'])
        ) {
            return '<div id="bloks-builder-content">'
                .wp_specialchars_decode(
                        get_post_meta(get_the_ID(), '_builder_content', true),
                        ENT_QUOTES
                    )
            .'</div>';
        }

        return $content;
    }

    /**
     * Method to show hide admin bar when in iframe
     *
     * @param bool $show_admin_bar
     * @return bool
     */
    public function showAdminBar($show_admin_bar) 
    {
        if($this->isIframe()) {
            $show_admin_bar = false;
        }

        return $show_admin_bar;
    }

    /**
     * Replace edit page link to Bloks Builder in admin bar menu
     *
     * @param WP_Admin_Bar $wp_admin_bar
     */
    public function addAdminBarMenu($wp_admin_bar)
    {
        global $post;

        if ($post && !is_admin() && $post->post_type == self::POST_TYPE) {
            $link = get_permalink($post);
            $link .= strpos($link, '?') === false ? '?bloks' : '&bloks';

            $args = array(
                'id' => 'edit',
                'title' => __('Bloks Builder', BLOKS_TEXTDOMAIN),
                'href' => $link
            );

            $wp_admin_bar->add_node($args);
        }
    }

    /**
     * Method to check current page is landing or not
     *
     * @return bool
     */
    static function isLandingPage() 
    {
        global $post;
        global $pagenow;

        return (
            $pagenow != 'wp-login.php'
            && !is_admin()
            && $post
            && $post->post_type == self::POST_TYPE
        );
    }

    /**
     * Method to check is in iframe or not
     *
     * @return bool
     */
    static function isIframe()
    {
        return (self::isLandingPage()
            && isset($_GET['iframe']));
    }

    /**
     * Method to add Bloks Builder link to page row actions
     *
     * @param array $actions
     * @param WP_Post $post
     * @return mixed
     */
    public function addPageRowActions($actions, $post)
    {
        if ($post->post_type == self::POST_TYPE
            && $post->ID != get_option('page_for_posts')) {
            $link = get_permalink($post);
            $link .= strpos($link, '?') === false ? '?bloks' : '&bloks';
            $actions['edit bloks-builder'] = '<a href="' . $link . '" rel="permalink"'
                . 'title="' . __('Edit with Bloks Builder', BLOKS_TEXTDOMAIN) . '">'
                . __('Bloks Builder', BLOKS_TEXTDOMAIN) . '</a>';
        }

        return $actions;
    }

    /**
     * Remove the slug from published post permalink
     *
     * @param string $post_link
     * @param WP_Post $post
     * @return mixed
     */
    public function postTypeLink($post_link, $post) 
    {
        if (self::POST_TYPE != $post->post_type || 'publish' != $post->post_status) {
            return $post_link;
        }

        $post_link = str_replace('/' . $post->post_type . '/', '/', $post_link);

        return $post_link;
    }

    /**
     * Override get posts
     *
     * @param WP_Query $query
     */
    public function preGetPosts($query) 
    {
        // Only noop the main query
        if (!$query->is_main_query()) {
            return;
        }

        // Only noop our very specific rewrite rule match
        if (2 != count($query->query)
            || ! isset($query->query['page'])) {
            return;
        }

        $query->set('post_type', array('post', self::POST_TYPE, 'page'));
    }
    /**
     * Remove auto add p tags
     */
    public function bloksFormatting()
    {
        global $post_type;
        if($post_type == self::POST_TYPE) {
            remove_filter('the_content', 'wpautop');
            remove_filter('the_excerpt', 'wpautop');
        }
    }

    /**
     * Get meta for page
     */
    public function addMetaData()
    {
        global $post;

        $result = '';
        if ($post && $post->ID) {
            $meta_keywords = get_post_meta($post->ID, '_meta_keywords', true);
            if (!empty($meta_keywords)) {
                $result .= '<meta name="keywords"'
                        .' content="'.$meta_keywords.'" />'.PHP_EOL;
            }

            $meta_description = get_post_meta($post->ID, '_meta_description', true);
            if (!empty($meta_description)) {
                $result .= '<meta name="description"'
                        .' content="'.$meta_description.'" />'.PHP_EOL;
            }
        }
        echo $result;
    }
    /**
     * Create params for frontend
     */
    public function addParamFrontend()
    {
        ?>
        <script type="text/javascript">
            var Bloks = Bloks || {};
            Bloks.Params = {
                baseUrl: '<?php echo get_option('siteurl');?>',
                wpnonce: '<?php echo wp_create_nonce();?>'
            };
        </script>
        <?php
    }
}

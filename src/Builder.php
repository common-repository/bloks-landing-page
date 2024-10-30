<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_Builder
 *
 * @package     Bloks
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Builder
{
    private $_component = null;

    /**
     * List blocks
     *
     * @var array
     */
    public $categories = array(
        'image'         => 'Image',
        'grid'          => 'Grid',
        'text'          => 'Text',
        'form'          => 'Form',
        'testimonial'   => 'Testimonial',
        'google-maps'   => 'Google Maps',
    //        'widget'        => 'Widget',
        'tabs'          => 'Tabs'
    );

    /**
     * Bloks_Builder constructor.
     */
    public function __construct()
    {
        /**
         * Hooks to template include
         */
        add_filter(
            'template_include',
            array($this, 'templateInclude')
        );

        /**
         * Hook generate bloks builder link
         */
        add_filter(
            'redirect_post_location',
            array($this, 'redirectPostLocation')
        );

        /**
         * Enqueue scripts
         */
        add_action(
            'wp_enqueue_scripts',
            array($this, 'enqueueScripts')
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

        /**
         * Hook to add inline scripts
         */
        add_action(
            'wp_footer',
            array($this, 'enqueueInlineScripts'),
            99
        );

        /**
         * Hide admin bar in builder page
         */
        add_filter(
            'show_admin_bar',
            array($this, 'showAdminBar')
        );

        /**
         * Register theme actions
         */
        new Bloks_Builder_Actions();
        new Bloks_Builder_CustomBloks();
        $this->_component = new Bloks_Builder_Component();
        $this->_preset = new Bloks_Builder_Preset();
    }

    /**
     * Remove all javascript files.
     */
    public function removeExternalScripts()
    {
        global $wp_scripts;

        if (self::isActive()) {
            $wp_scripts->queue = array(
                'bloks-polyfill',
                'underscore',
                'bloks-tinycolor',
                'bloks-webfontloader',
                'bloks-vue',
                'bloks-nicescroll',
                'bloks-tooltipster',
                'bloks-serialize-object',
                'bloks-codemirror',
                'bloks-codemirror-mode-css',
                'bloks-codemirror-hint-show-hint',
                'bloks-codemirror-hint-css-hint',
                'bloks-codemirror-hint-javascript-hint',
                'bloks-codemirror-mode-javascript',
                'bloks-builder'
            );
        }
    }

    /**
     * Remove all stylesheet files.
     */
    public function removeExternalStyles()
    {
        global $wp_styles;

        if (self::isActive()) {
            $wp_styles->queue = array(
                'bloks-tooltipster',
                'bloks-animate',
                'bloks-codemirror',
                'bloks-codemirror-hint-show-hint',
                'bloks-builder',
            );
        }
    }

    /**
     * Enqueues scripts and styles
     */
    public function enqueueScripts()
    {
        if (self::isActive()) {
            wp_enqueue_style(
                'bloks-tooltipster',
                BLOKS_ROOT_URL . 'vendor/tooltipster/dist/css/tooltipster.bundle.min.css',
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-animate',
                BLOKS_ROOT_URL . 'vendor/animate.css/animate.min.css',
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-codemirror',
                BLOKS_ROOT_URL . 'vendor/codemirror/lib/codemirror.css',
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-codemirror-hint-show-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/show-hint.css',
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-builder',
                BLOKS_ROOT_URL . 'assets/css/builder.min.css',
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-polyfill',
                BLOKS_ROOT_URL . 'vendor/babel-polyfill/browser-polyfill.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script('underscore');

            wp_enqueue_script(
                'bloks-tinycolor',
                BLOKS_ROOT_URL . 'vendor/tinycolor/dist/tinycolor-min.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-webfontloader',
                BLOKS_ROOT_URL . 'vendor/webfontloader/webfontloader.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-vue',
                BLOKS_ROOT_URL . 'vendor/vue/dist/vue.min.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-nicescroll',
                BLOKS_ROOT_URL . 'vendor/jquery.nicescroll/dist/jquery.nicescroll.min.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-tooltipster',
                BLOKS_ROOT_URL . 'vendor/tooltipster/dist/js/tooltipster.bundle.min.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-serialize-object',
                BLOKS_ROOT_URL .
                    'vendor/jquery-serialize-object/dist/jquery.serialize-object.min.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-codemirror',
                BLOKS_ROOT_URL . 'vendor/codemirror/lib/codemirror.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-codemirror-mode-css',
                BLOKS_ROOT_URL . 'vendor/codemirror/mode/css/css.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-codemirror-hint-show-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/show-hint.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-codemirror-hint-css-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/css-hint.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-codemirror-hint-javascript-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/javascript-hint.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-codemirror-mode-javascript',
                BLOKS_ROOT_URL . 'vendor/codemirror/mode/javascript/javascript.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_script(
                'bloks-builder',
                BLOKS_ROOT_URL . 'assets/js/builder.min.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );
        }
    }

    /**
     * Method to add inline scripts to builder page
     */
    public function enqueueInlineScripts() 
    {
        if (self::isActive()) {
            // @codingStandardsIgnoreStart
            ?>
            <script type="text/javascript">
                Bloks.Settings = {
                    ajax: '<?php echo admin_url('admin-ajax.php')?>',
                    login_url: '<?php echo wp_login_url() ?>',
                    page_id: <?php echo get_the_ID()?>,
                    colorsets: JSON.parse('<?php echo json_encode(Bloks()->getBuilderFactory()->getColorSets())?>'),
                    wpnonce: '<?php echo wp_create_nonce();?>'
                };
            </script>
            <?php $templates = Bloks()->getBuilderFactory()->getComponent()->getTemplates(); ?>
            <?php foreach ($templates as $type => $value): ?>
                <?php if (isset($value['templates']) && count($value['templates'])) : ?>
                    <?php foreach ($value['templates'] as $name => $instance): ?>
                        <script type="text/x-template" id="<?php echo $type . '-' . $name ?>-template">
                            <?php echo $instance->getParamsString() ?>
                            <partial name="<?php echo $type . '-' . $name ?>-template"></partial>
                        </script>
                        <script type="text/javascript">
                            Vue.partial('<?php echo $type . '-' . $name ?>-template', '<?php echo wp_slash($instance->getContent(true, true)) ?>');
                        </script>
                    <?php endforeach; ?>
                <?php endif; ?>
            <?php endforeach; ?>

            <?php $presettemplates = Bloks()->getBuilderFactory()->getPreset()->getPresetTemplates(); ?>
            <?php foreach ($presettemplates as $type => $value): ?>
                <?php if (count($value)) : ?>
                    <?php foreach ($value as $name => $instance): ?>
                        <div style="display: none"
                             id="<?php echo 'preset-' . $name ?>-template"><?php echo $instance->getContent(); ?></div>
                    <?php endforeach; ?>
                <?php endif; ?>
            <?php endforeach; ?>
            <?php
            // @codingStandardsIgnoreEnd
        }
    }

    /**
     * Method to show hide admin bar when in iframe
     *
     * @param bool $show_admin_bar
     * @return bool
     */
    public function showAdminBar($show_admin_bar)
    {
        if(self::isActive()) {
            $show_admin_bar = false;
        }

        return $show_admin_bar;
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
        if (self::isActive()) {
            return BLOKS_ROOT_PATH . DS . 'builder.php';
        }

        return $template;
    }

    /**
     * Method to get Component instance
     *
     * @return null|Bloks_Builder_Component
     */
    public function getComponent()
    {
        return $this->_component;
    }

    /**
     * Method to get Preset instance
     *
     * @return null|Bloks_Builder_Preset
     */
    public function getPreset()
    {
        return $this->_preset;
    }

    /**
     * Builder is active or not
     *
     * @return bool
     */
    static function isActive()
    {
        global $post;

        return (!is_admin()
            && $post
            && $post->post_type == Bloks_LandingPage::POST_TYPE
            && ( current_user_can('edit_page', $post->ID) )
            && isset($_GET['bloks']));
    }

    /**
     * Redirect post
     *
     * @param string $location
     * @return false|string
     */
    public function redirectPostLocation($location)
    {
        if (isset($_GET['post'])) {
            $post_id  = absint($_GET['post']);
        } elseif (isset($_POST['post_ID'])) {
            $post_id = absint($_POST['post_ID']);
        } else {
            $post_id = 0;
        }
        $link = get_permalink($post_id);
        $link .= strpos($link, '?') === false ? '?bloks' : '&bloks';
        if (isset($_POST['bloks_builder'])) {
            return $link;
        } else {
            return $location;
        }
    }

    /**
     * Method to get theme color sets
     *
     * @return mixed|array
     */
    public function getColorSets()
    {
        $colorsets = array(
            'dark' => array(
                'title' => 'Dark',
                'class' => 'bloks__colorset-dark',
                'preview' => BLOKS_ROOT_URL
                    . 'assets/images/builder/colorsets/dark.svg'
            ),
            'none' => array(
                'title' => 'Light',
                'class' => 'bloks__colorset-light',
                'preview' => BLOKS_ROOT_URL
                    . 'assets/images/builder/colorsets/none.svg'
            )
        );

        return apply_filters('bloks_get_color_sets', $colorsets);
    }
}

<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_Admin_CustomBloks
 *
 * @package     Bloks
 * @subpackage  Admin
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Admin_CustomBloks
{
    /**
     * Bloks theme custom constructor
     */
    public function __construct()
    {
        add_filter('transition_post_status', array($this, 'bloksStatus'), 10, 3);
        add_filter('admin_post_thumbnail_html', array($this, 'bloksThumbail'), 1, 3);
        add_action(
            'save_post_' . Bloks_CustomBloks::POST_TYPE,
            array($this, 'savePostBlocks')
        );
        add_action('edit_form_after_editor', array($this, 'bloksEditor'));
        add_action('edit_terms', array($this, 'bloksEditedCategory'), 10, 2);
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));
        add_filter('submenu_file', array($this, 'blokActiveSubMenu'));
        add_action('admin_menu', array($this, 'registerMenu'));
        add_filter('parent_file', array($this, 'blokActiveParentMenu'));
    }

    /**
     * Enqueues scripts and styles
     */
    public function enqueueScripts()
    {
        global $post;

        wp_enqueue_script('jquery-ui-core');
        wp_enqueue_script('jquery-ui-tabs');

        if (is_admin()
            && ((isset($_GET['post_type'])
            && sanitize_text_field($_GET['post_type']) === Bloks_CustomBloks::POST_TYPE)
            || ($post && $post->post_type === Bloks_CustomBloks::POST_TYPE))
        ) {
            wp_enqueue_script(
                'bloks-codemirror',
                BLOKS_ROOT_URL . 'vendor/codemirror/lib/codemirror.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-codemirror-mode-css',
                BLOKS_ROOT_URL . 'vendor/codemirror/mode/css/css.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-codemirror-mode-javascript',
                BLOKS_ROOT_URL . 'vendor/codemirror/mode/javascript/javascript.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-codemirror-mode-xml',
                BLOKS_ROOT_URL . 'vendor/codemirror/mode/xml/xml.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-codemirror-hint-show-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/show-hint.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-codemirror-hint-css-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/css-hint.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-codemirror-hint-xml-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/xml-hint.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-codemirror-hint-html-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/html-hint.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-codemirror-hint-javascript-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/javascript-hint.js',
                array('jquery'),
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-codemirror',
                BLOKS_ROOT_URL . 'vendor/codemirror/lib/codemirror.css',
                Bloks()->getVersion()
            );

            wp_enqueue_style(
                'bloks-hint-show-hint',
                BLOKS_ROOT_URL . 'vendor/codemirror/addon/hint/show-hint.css',
                Bloks()->getVersion()
            );

            wp_enqueue_script(
                'bloks-admin',
                BLOKS_ROOT_URL . 'assets/js/custom-bloks.min.js',
                array('jquery'),
                Bloks()->getVersion(),
                true
            );

            wp_enqueue_style(
                'bloks-admin',
                BLOKS_ROOT_URL . 'assets/css/admin.min.css',
                Bloks()->getVersion()
            );
        }
    }

    /**
     * Custom editor
     */
    public function bloksEditor()
    {
        $info = get_post();
        if (is_object($info) && isset($info->post_type)
            && ($info->post_type == Bloks_CustomBloks::POST_TYPE)
        ) {

            $upload_dir = wp_upload_dir();
            $baseDir = $upload_dir['basedir'] . '/bloks/';
            $baseFolder = $baseDir . $info->ID;
            $dataHtml = $dataCss = $dataJs = '';
            // check folder
            if (is_dir($baseFolder)) {
                if (file_exists($baseFolder . '/index' . $info->ID . '.html')) {
                    $helper = new Bloks_Core_Block_Template_Processor(
                        $baseFolder . '/index' . $info->ID . '.html'
                    );
                    $dataHtml = $helper->getContent();
                }
                if (file_exists($baseFolder . '/stylesheet' . $info->ID . '.css')) {
                    $dataCss = file_get_contents(
                        $baseFolder . '/stylesheet' . $info->ID . '.css'
                    );
                }
                if (file_exists($baseFolder . '/javascript' . $info->ID . '.js')) {
                    $dataJs = file_get_contents(
                        $baseFolder . '/javascript' . $info->ID . '.js'
                    );
                }
            }

            // @codingStandardsIgnoreStart
            ?>
            <div id="bloks__custombloks-form">
                <div>
                    <input type="button" class="button button-primary" id="open-template" value="Select bloks default">
                </div>
                <div class="bloks__custombloks-modal" title="template">
                    <!-- Modal content -->
                    <div class="bloks__custombloks-modal-content">
                        <div class="bloks__custombloks-modal-header">
                            <span class="bloks__custombloks-modal-header-close">&times;</span>
                            <h2><?php _e('Bloks Template Default', BLOKS_TEXTDOMAIN) ?></a></h2>
                        </div>
                        <div class="bloks__custombloks-modal-body" id="bloks-modal-body">
                            <div class="bloks__admin__canvas__nav" id="bloks_admin_template">
                                <?php $templates = Bloks()->getBuilderFactory()->getComponent()->getTemplates(); ?>
                                <ul class="bloks__admin__canvas__nav-type">
                                    <?php foreach ($templates as $type => $value): ?>
                                        <li>
                                            <a href="#<?php echo $type ?>">
                                                <?php _e($value['title'], BLOKS_TEXTDOMAIN) ?></a>
                                        </li>
                                    <?php endforeach ?>
                                </ul>
                                <div class="bloks__admin__canvas__nav-templates">
                                    <?php foreach ($templates as $type => $value): ?>
                                        <?php if (isset($value['templates']) && count($value['templates'])): ?>
                                            <div class="bloks__admin__canvas__nav-template" id="<?php echo $type ?>">
                                                <?php $number = 0 ?>
                                                <?php foreach ($value['templates'] as $name => $instance): ?>
                                                    <?php if ($instance->isAcceptPostType(get_post_type())): ?>
                                                        <?php $number++;
                                                        echo ($number == 1) ? '<ul>' : ''; ?>
                                                        <li>
                                                            <?php if (!(isset($instance->is_custom) && $instance->is_custom)) { ?>
                                                                <a class="bloks__custombloks-nav-item"
                                                                   href="javascript:void(0)"
                                                                   data-type="<?php echo $type ?>"
                                                                   data-name="<?php echo $name ?>">
                                                                    <div class="bloks__custombloks-nav-item-image">
                                                                        <img src="<?php echo $instance->getScreenshot() ?>"
                                                                             alt="<?php echo $instance->getName() ?>"/>
                                                                    </div>
                                                                    <div class="bloks__custombloks-nav-item-label">
                                                                        <span class="label"><?php echo $instance->getName() ?></span>
                                                                    </div>
                                                                </a>
                                                            <?php } ?>
                                                        </li>
                                                        <?php if ($number == 3) {
                                                            echo '</ul>';
                                                            $number = 0;
                                                        }
                                                        ?>
                                                    <?php endif ?>
                                                <?php endforeach ?>
                                                <?php echo (($number != 0) && ($number != 3)) ? '</ul>' : '' ?>
                                            </div>
                                        <?php endif ?>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bloks-custom-editor">
                    <div id="bloks-custom-tabs">
                        <ul class="bloks-tabs-nav">
                            <li><a href="#bloks-custom-html"><?php _e('Html', BLOKS_TEXTDOMAIN) ?></a></li>
                            <li><a href="#bloks-custom-css"><?php _e('StyleSheet', BLOKS_TEXTDOMAIN) ?></a></li>
                            <li><a href="#bloks-custom-js"><?php _e('JavaScript', BLOKS_TEXTDOMAIN) ?></a></li>
                        </ul>
                        <div class="bloks-tab-content">
                            <div id="bloks-custom-html">
                            <textarea name="bloks_editor_html" id="" rows="60"
                                      class="large-text code-editor-html"><?php echo htmlentities($dataHtml) ?></textarea>
                            </div>
                            <div id="bloks-custom-css">
                            <textarea name="bloks_editor_css" id="" rows="60"
                                      class="large-text code-editor-css"><?php echo $dataCss ?></textarea>
                            </div>
                            <div id="bloks-custom-js">
                            <textarea name="bloks_editor_js" id="" rows="60"
                                      class="large-text code-editor-js"><?php echo $dataJs ?></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            // @codingStandardsIgnoreEnd
        }
    }

    /**
     * Hook function status post
     *
     * @param string $newStatus
     * @param string $oldStatus
     * @param object $post
     */
    public function bloksStatus($newStatus, $oldStatus, $post)
    {
        if (isset($post) && ($post->post_type == Bloks_CustomBloks::POST_TYPE)
            && ($newStatus == 'publish')
        ) {
            $post->post_status = 'private';
            wp_update_post($post);
        }
    }

    /**
     * Hook function thumbnail post
     *
     * @param string $html
     * @param int $post_id
     * @param int $post_image_id
     *
     * @return string
     */
    public function bloksThumbail($html, $post_id, $post_image_id)
    {
        $change = 1;
        $upload_dir = wp_upload_dir();
        $baseDir = $upload_dir['basedir'] . '/bloks/';
        $baseFolder = $baseDir . $post_id;
        $screenshot = $baseFolder . '/screenshot.png';
        if (file_exists($screenshot)) {
            $id = get_post_thumbnail_id($post_id);
            $change = ($id == $post_image_id) ? 0 : 1;
        }
        if ($post_image_id && !empty($post_image_id)) {
            $html .= '<input  name="bloks_thumbnails_change" type="hidden" value="'
                . $change . '"/>';
        }

        return $html;
    }

    /**
     * Check save category
     *
     * @param int $term_id  Term ID.
     * @param string $taxonomy Taxonomy slug.
     */
    public function bloksEditedCategory($term_id, $taxonomy)
    {
        $term = get_term($term_id, $taxonomy);
        $categories = Bloks()->getBuilderFactory()->categories;
        if (!is_wp_error($term)) {
            if (in_array($term->slug, array_keys($categories))) {
                if ($taxonomy == 'bloks_category') {
                    wp_redirect(
                        admin_url(
                            'edit.php?post_type=' . Bloks_CustomBloks::POST_TYPE
                        )
                    );
                    exit;
                }
            }
        }
    }

    /**
     * Hook function save
     */
    public function savePostBlocks()
    {
        $data = $_POST;
        $postType = isset($data['post_type'])
            ? sanitize_text_field($data['post_type']): false ;
        $postId = isset($data['post_ID'])
            ?absint($data['post_ID']): '';
        $postTitle = isset($data['post_title'])
            ? sanitize_text_field($data['post_title']) :'';
        $thumbnailId = isset($data['_thumbnail_id'])
            ? intval($data['_thumbnail_id']) : '';
        if (is_array($data) && $postType
            && ($postType == Bloks_CustomBloks::POST_TYPE)
        ) {
            $dataHtml = esc_html(wp_unslash($data['bloks_editor_html']));
            $dataCss = esc_html($data['bloks_editor_css']);
            $dataJs = esc_html(wp_unslash($data['bloks_editor_js']));
            //start update data in files
            $upload_dir = wp_upload_dir();
            $baseDir = $upload_dir['basedir'] . '/bloks/';
            $baseFolder = $baseDir . $postId;

            if (!is_dir($baseFolder)) {
                mkdir($baseFolder);
            }
            if (is_dir($baseFolder)) {
                $html = '<!--@name ' . $postTitle . ' @-->' . PHP_EOL;
                if (isset($thumbnailId) && ($thumbnailId > 0)) {
                    $html .= '<!--@screenshot ' . $upload_dir['baseurl']
                        . '/bloks/' . $postId
                        . '/screenshot.png @-->' . PHP_EOL;
                } else {
                    if (file_exists($baseFolder.'/screenshot.png')) {
                        wp_delete_file($baseFolder.'/screenshot.png');
                    }
                }
                $html .= $dataHtml;
                $openHtml = fopen(
                    $baseFolder . '/index' . $postId . '.html', 'w'
                );
                $openCss = fopen(
                    $baseFolder . '/stylesheet' . $postId . '.css', 'w'
                );
                $openJs = fopen(
                    $baseFolder . '/javascript' . $postId . '.js', 'w'
                );

                fwrite($openHtml, wp_specialchars_decode($html, ENT_QUOTES));
                fwrite($openCss, wp_specialchars_decode($dataCss, ENT_QUOTES));
                fwrite($openJs, wp_specialchars_decode($dataJs, ENT_QUOTES));
                fclose($openHtml);
                fclose($openCss);
                fclose($openJs);
                // check image thumbnails and copy
                if (isset($thumbnailId)
                    && isset($data['bloks_thumbnails_change'])
                    && $data['bloks_thumbnails_change']
                ) {
                    $screenshot = $baseFolder . '/screenshot.png';
                    $infoThumbnail = image_get_intermediate_size(
                        $thumbnailId
                    );
                    if ($infoThumbnail
                        && is_array($infoThumbnail)
                        && isset($infoThumbnail['path'])) {
                        $pathImage = $upload_dir['basedir'] . DS . $infoThumbnail['path'];
                    }
                    if (isset($pathImage) && file_exists($pathImage)) {
                        copy($pathImage, $screenshot);
                    }
                }
            }
        }
    }

    /**
     * Custom active submenu
     *
     * @param string $submenu_file
     *
     * @return string
     */
    public function blokActiveSubMenu($submenu_file)
    {
        if ($submenu_file == 'post-new.php?post_type=' . Bloks_CustomBloks::POST_TYPE) {
            return 'edit.php?post_type=' . Bloks_CustomBloks::POST_TYPE;
        } else {
            return $submenu_file;
        }
    }

    /**
     * Custom active Parent menu
     *
     * @param string $parent_file
     *
     * @return string
     */
    public function blokActiveParentMenu($parent_file)
    {
        if ($parent_file == 'edit.php?post_type=' . Bloks_CustomBloks::POST_TYPE) {
            return 'edit.php?post_type=' . Bloks_LandingPage::POST_TYPE;
        } else {
            return $parent_file;
        }
    }

    /**
     * Bloks register menu
     */
    public function registerMenu()
    {
        add_submenu_page(
            'edit.php?post_type=' . Bloks_LandingPage::POST_TYPE,
            __('Custom Bloks', BLOKS_TEXTDOMAIN),
            __('Custom Bloks', BLOKS_TEXTDOMAIN),
            'manage_options',
            'edit.php?post_type=' . Bloks_CustomBloks::POST_TYPE
        );
    }
}

<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_Builder_CustomBloks
 *
 * @package     Bloks
 * @subpackage  Builder
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Builder_CustomBloks
{
    /**
     * Bloks_Builder_CustomBlocks constructor.
     */
    public function __construct()
    {
        add_filter('bloks_builder_get_templates', array( $this, 'bloksBuilderCustom' ));
        add_action('wp_enqueue_scripts', array($this, 'bloksEnqueueScripts'));
    }

    /**
     * Builder custom bloks template
     *
     * @param string $templates
     *
     * @return mixed
     */
    public function bloksBuilderCustom( $templates )
    {
        $args       = array(
            'posts_per_page'   => - 1,
            'post_type'        => Bloks_CustomBloks::POST_TYPE,
            'post_status'      => 'private',
            'suppress_filters' => true
        );
        $postsArray = get_posts($args);
        $upload_dir = wp_upload_dir();
        $baseDir    = $upload_dir['basedir'] . '/bloks/';
        if ($postsArray && is_array($postsArray) ) {
            foreach ( $postsArray as $key => $post ) {
                $types = get_the_terms($post->ID, Bloks_CustomBloks::CATEGORY);
                if(!is_wp_error($types)&&$types) {
                    foreach ($types as $type){
                        $files = Bloks()->getBuilderFactory()
                                        ->getComponent()
                                        ->getTemplateFiles($baseDir . $post->ID);
                        foreach ($files as $filename => $file) {
                            $instance = new Bloks_Core_Block_Template_Processor($file);
                            $instance->is_custom = true;
                            $templates[$type->slug]['templates'][$filename] = $instance;
                        }
                    }
                }
            }
        }

        return $templates;
    }
    /**
     * Builder custom bloks style and javascript
     */
    public function bloksEnqueueScripts()
    {
        if(!is_admin()) {
            $args       = array(
                'posts_per_page'   => - 1,
                'post_type'        => Bloks_CustomBloks::POST_TYPE,
                'post_status'      => 'private',
                'suppress_filters' => true,
            );
            $postsArray = get_posts($args);
            $upload_dir = wp_upload_dir();
            $baseDir = $upload_dir['baseurl'].'/bloks/';
            if ($postsArray && is_array($postsArray) ) {
                foreach ( $postsArray as $key => $post ) {
                    if(taxonomy_exists(Bloks_CustomBloks::CATEGORY)) {
                        $type = get_the_terms($post->ID, Bloks_CustomBloks::CATEGORY);
                        if (isset($type[0])) {
                            wp_enqueue_script(
                                'bloks-custom-blok-'.$post->ID,
                                $baseDir.$post->ID.'/javascript'.$post->ID.'.js'
                            );
                            wp_enqueue_style(
                                'bloks-custom-blok-'.$post->ID,
                                $baseDir.$post->ID.'/stylesheet'.$post->ID.'.css'
                            );
                        }
                    }
                }
            }
        }
    }
}

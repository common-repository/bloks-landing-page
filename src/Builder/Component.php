<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_Builder_Component
 *
 * @package     Bloks
 * @subpackage  Builder
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Builder_Component
{
    private $_types = array();

    /**
     * Method to get types
     *
     * @return array
     */
    public function getTypes()
    {
        $categories = get_terms(
            array(
                'taxonomy'      => Bloks_CustomBloks::CATEGORY,
                'hide_empty'    => false,
                'orderby'       => 'id'
            )
        );

        if (!is_wp_error($categories) && $categories) {
            foreach ($categories as $category) {
                $this->_types[$category->slug] = $category->name;
            }
        }

        return $this->_types;
    }

    /**
     * Method to get templates instance
     *
     * @return array
     */
    public function getTemplates()
    {
        $templates = array();
        foreach ($this->getTypes() as $name => $title) {
            $templates[$name]['title'] = $title;
            $files = $this->getTemplateFiles(
                BLOKS_ROOT_PATH . DS . 'blocks' . DS . $name
            );

            /**
             * Override template files with theme files
             */
            foreach ($files as $filename => $file) {
                $stylesheet = get_stylesheet_directory()
                    . '/bloks/blocks/' . $name . '/'
                              . sanitize_file_name($filename) . '.html';
                $template = get_template_directory()
                    . '/bloks/blocks/' . $name . '/'
                            . sanitize_file_name($filename) . '.html';

                if (file_exists($stylesheet)) {
                    $file = $stylesheet;
                } elseif (file_exists($template)) {
                    $file = $template;
                }

                $instance = new Bloks_Core_Block_Template_Processor($file);
                $templates[$name]['templates'][$filename] = $instance;
            }
        }

        /**
         * Create plugin hook
         */
        $templates = apply_filters('bloks_builder_get_templates', $templates);
        return $templates;
    }

    /**
     * Method to get the full path of all files
     * in the directoryand all subdirectories of a directory
     *
     * @param string $dir
     * @return array
     */
    public function getTemplateFiles($dir)
    {
        $result = array();

        $files = glob($dir . DS . '*.html');
        foreach ($files as $file) {
            $fileInfo = pathinfo($file);
            $result[$fileInfo['filename']] = $file;
        }

        return $result;
    }
}

import express from 'express';
import pool from '../db/database.mjs';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id');

        res.json({
            success: true,
            count: result.rows.length,
            products: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// GET single product
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// POST - Create product
router.post('/', async (req, res) => {
    try {
        const { name, quantity, price, category } = req.body;

        if (!name || quantity === undefined || price === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Name, quantity and price are required'
            });
        }

        const result = await pool.query(
            `INSERT INTO products (name, quantity, price, category)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [name, parseInt(quantity), parseFloat(price), category || 'General']
        );

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
});

// PUT - Update product
router.put('/:id', async (req, res) => {
    try {
        const { name, quantity, price, category } = req.body;

        // Check if product exists
        const checkResult = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [req.params.id]
        );

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const result = await pool.query(
            `UPDATE products 
             SET name = COALESCE($1, name),
                 quantity = COALESCE($2, quantity),
                 price = COALESCE($3, price),
                 category = COALESCE($4, category),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $5
             RETURNING *`,
            [
                name || null,
                quantity !== undefined ? parseInt(quantity) : null,
                price !== undefined ? parseFloat(price) : null,
                category || null,
                req.params.id
            ]
        );

        res.json({
            success: true,
            message: 'Product updated successfully',
            product: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
});

// DELETE - Remove product
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully',
            product: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
});

export default router;
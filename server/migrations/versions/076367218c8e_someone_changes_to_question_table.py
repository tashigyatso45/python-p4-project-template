""" Someone changes to question table 

Revision ID: 076367218c8e
Revises: fc550d73411e
Create Date: 2023-12-13 17:08:57.196279

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '076367218c8e'
down_revision = 'fc550d73411e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.alter_column('content',
               existing_type=sa.VARCHAR(),
               type_=sa.Integer(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.alter_column('content',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(),
               existing_nullable=True)

    # ### end Alembic commands ###
